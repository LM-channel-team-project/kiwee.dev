import axios from 'axios';
import dotenv from 'dotenv';
import AtlasClient from './atlasClient';
import parser, { CustomItem } from './util/parser';
// types, interface
import { RssProviderModel } from './model/RssProvider';
import { Item } from 'rss-parser';
// Repository
import RssProviderRepository from './repository/RssProviderRepository';
import ArticleRepository, {
  SaveArticleProps,
} from './repository/ArticleRepository';
import { asyncForEach, asyncMap, filter } from './util/functional';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.env',
});

interface ExtractResponse {
  keywords: string[];
  thumbnail: string;
}

const INTERVAL = parseInt(process.env.INTERVAL_HOURS || '3') * 1000 * 60 * 60;
const KEYWORD_EXTRACTOR_URL = process.env.KEYWORD_EXTRACTOR_URL as string;
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || '2');
async function compactItem(
  item: CustomItem & Item,
  providerProps: {
    providerId: string;
    providerName: string;
    providerAvatar: string;
  }
): Promise<SaveArticleProps> {
  return {
    ...providerProps,
    ...(await extractItemInfo(item)),
    title: item.title!,
    insertDate: new Date(item.isoDate!),
    articleUrl: item.link!,
  };
}
async function extractItemInfo(
  item: CustomItem & Item
): Promise<ExtractResponse> {
  const response = await axios.post(KEYWORD_EXTRACTOR_URL, {
    postUrl: item.link,
  });
  return {
    keywords: response.data.keywords || [],
    thumbnail: response.data.thumbnail || '',
  };
}

function filterNewArticle(item: CustomItem & Item, lastModifiedTime: Date) {
  if (!item.isoDate) return false;
  return lastModifiedTime < new Date(item.isoDate);
}

async function checkRss({
  providerId,
  providerName,
  providerAvatar,
  rssLink,
  lastModifiedTime,
}: RssProviderModel) {
  console.log('current provider:', providerName);
  try {
    // 2-1. 사용자 정보에 있는 마지막 글이 올라온 시간과 피드의 글이 올라온 시간을 비교하여 새로운 글을 확인한다.
    const feed = await parser.parseURL(rssLink as string);
    const filteredItem = await asyncMap(
      i => i,
      undefined,
      filter<CustomItem & Item>(filterNewArticle, feed.items, lastModifiedTime)
    );
    // 2-2. 새로운 글의 정보와 추가적인 정보를 정리한다.
    const articles = await asyncMap<CustomItem & Item, SaveArticleProps>(
      undefined,
      item =>
        compactItem(item, {
          providerAvatar,
          providerId,
          providerName,
        }),
      filteredItem
    );
    const lastUploadedTime = new Date(
      articles.reduce((latest, cur) => {
        return Math.max(latest, cur.insertDate.getTime());
      }, 0)
    );
    // 3. provider의 lastModifiedTime을 새로운 글의 등록 시간 중 가장 최근 시간으로 갱신한다.
    // 4. rssFeed를 저장한다.
    await Promise.all([
      RssProviderRepository.updateLastModifiedTime(
        providerId,
        lastUploadedTime
      ),
      asyncForEach(article => ArticleRepository.saveRssFeed(article), articles),
    ]);
    console.log('###############################################');
    console.log('제공자:', providerName);
    console.log('업데이트 아티클 갯수:', articles.length);
    console.log('마지막 업데이트 날짜:', lastUploadedTime);
  } catch (e) {
    console.log(e);
  }
}

/**
 * 1. 모든 사용자 정보 fetch (사용자 많아지면 paginate 해야함.)
 * 2. RSS Link로 들어가 피드를 확인한다.
 *    2-1. 사용자 정보에 있는 마지막 글이 올라온 시간과 피드의 글이 올라온 시간을 비교하여 새로운 글을 확인한다.
 *    2-2. 새로운 글의 정보와 추가적인 정보를 정리한다.
 * 3. provider의 lastModifiedTime을 새로운 글의 등록 시간 중 가장 최근 시간으로 갱신한다.
 * 4. rssFeed를 저장한다.
 */
const crawl = async () => {
  let isCrawling = false;
  const crawlAllProvidersRss = async () => {
    try {
      if (isCrawling) return;
      isCrawling = true;
      console.log('fetch providers from atlas');
      const providers = await RssProviderRepository.findAllRssProvider();
      console.log(`start check RSS feed (batch size : ${BATCH_SIZE})`);
      for (let i = 0; i < providers.length; i += BATCH_SIZE) {
        const currentProviders = providers.slice(i, i + BATCH_SIZE);
        await Promise.all(currentProviders.map(p => checkRss(p)));
      }
    } catch (e) {
      console.log(e);
    } finally {
      isCrawling = false;
      console.log('end check RSS feed');
    }
  };
  crawlAllProvidersRss();
  setInterval(crawlAllProvidersRss, INTERVAL);
};

(async () => {
  await AtlasClient.connect();
  crawl();
})();

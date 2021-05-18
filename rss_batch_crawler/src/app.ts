import axios from 'axios';
import dotenv from 'dotenv';
import { Item } from 'rss-parser';
import AtlasClient from './atlasClient';

// types, interface
import { ProviderType } from './type/ProviderType';

// Repository
import ProviderRepository from './repository/ProviderRepository';
import { SaveArticleProps } from './repository/ArticleRepository';
import ArticleService from './service/ArticleService';

// utils
import { asyncForEach, asyncMap, filter } from './util/functional';
import parser, { CustomItem } from './util/parser';

// Server
import Server from './server';

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
    name: string;
    avatar: string;
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

export async function checkRss({
  providerId,
  name,
  avatar,
  rssLink,
  lastModifiedTime,
}: ProviderType) {
  console.log('provider:', name);
  console.log('rssLink:', rssLink);
  if (rssLink === 'default') return;

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
          avatar,
          providerId,
          name,
        }),
      filteredItem
    );
    if (articles.length === 0) {
      console.log('새로운 글 없음!');
      return;
    }

    const lastUploadedTime = new Date(
      articles.reduce((latest, cur) => {
        return Math.max(latest, cur.insertDate.getTime());
      }, 0)
    );
    // 3. provider의 lastModifiedTime을 새로운 글의 등록 시간 중 가장 최근 시간으로 갱신한다.
    // 4. rssFeed를 저장한다.
    await Promise.all([
      ProviderRepository.updateLastModifiedTime(providerId, lastUploadedTime),
      asyncForEach(article => ArticleService.saveArticle(article), articles),
    ]);
    console.log('###############################################');
    console.log('제공자:', name);
    console.log('업데이트 아티클 갯수:', articles.length);
    console.log('마지막 업데이트 날짜:', lastUploadedTime);
  } catch (e) {
    console.log(e);
  }
}

/**
 * 1. 모든 사용자 정보 fetch (BATCH_SIZE 만큼 비동기 처리)
 * 2. RSS Link로 들어가 피드를 확인한다.
 *    2-1. 사용자 정보에 있는 마지막 글이 올라온 시간과 피드의 글이 올라온 시간을 비교하여 새로운 글을 확인한다.
 *    2-2. 새로운 글의 정보와 추가적인 정보를 정리한다.
 * 3. provider의 lastModifiedTime을 새로운 글의 등록 시간 중 가장 최근 시간으로 갱신한다.
 * 4. article을 저장한다.
 */
const crawl = async () => {
  let isCrawling = false;
  const crawlAllProvidersRss = async () => {
    try {
      if (isCrawling) return;
      isCrawling = true;
      console.log('fetch providers from atlas');
      const providers = await ProviderRepository.findAllRssProvider();
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
  Server.listen();
  crawl();
})();

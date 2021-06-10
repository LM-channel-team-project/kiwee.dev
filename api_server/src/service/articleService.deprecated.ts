// repository
import articleRepository from '../repository/ArticleRepository';
import likesRepository from '../repository/LikesRepository.deprecated';
import providerRepository from '../repository/providerRepository.deprecated';
import bookmarkRepository from '../repository/BookmarkRepository';
import historyRepository from '../repository/HistoryRepository';

// type, interface
import { BookmarksModel } from '../model/Bookmarks';
import { HistoryModel } from '../model/History';

class ArticleService {
  private articleRepository = articleRepository;
  private likesRepository = likesRepository;
  private providerRepository = providerRepository;
  private bookmarkRepository = bookmarkRepository;
  private historyRepository = historyRepository;
  constructor() {}
  async checkIsVisited(articleId: string, providerId: string | undefined) {
    if (!providerId) return false;

    const { histories } = (await this.historyRepository.findHistoryByProviderId(
      providerId,
    )) as HistoryModel;
    if (!histories) return false;
    const historyList = histories.map((h) => h.articleId);
    return historyList.includes(articleId);
  }
  async checkIsBookmarked(articleId: string, providerId: string | undefined) {
    if (!providerId) return false;

    const { bookmarks } = (await this.bookmarkRepository.findBookmarksByProviderId(
      providerId,
    )) as BookmarksModel;
    if (!bookmarks) return false;
    const bookmarkList = bookmarks.map((b) => b.articleId);
    return bookmarkList.includes(articleId);
  }
  async findArticleById(articleId: string, providerId: string | undefined) {
    const result = await this.articleRepository.findArticleById(articleId);
    if (!result) throw new Error('article is not found');

    const [isBookmarked, isVisited, likes] = await Promise.all([
      this.checkIsBookmarked(articleId, providerId),
      this.checkIsVisited(articleId, providerId),
      this.likesRepository.findLikesByArticleId(articleId),
    ]);

    const { __v, _id, ...data } = result.toObject();
    return Object.assign({ isBookmarked, isVisited, likes: likes?.likes }, data);
  }
  async findArticlesByPage(
    page: number,
    providerId: string | undefined,
  ): Promise<{ [key: string]: any }> {
    const result = await this.articleRepository.findArticlesByPage(page);
    const { docs, ...pagenateData } = result;
    const ret: { [key: string]: any } = { ...pagenateData };
    ret.docs = await Promise.all(
      result.docs.map((article) =>
        likesRepository.findLikesByArticleId(article.articleId).then((likes) => {
          const { __v, _id, ...data } = article.toObject();
          return Object.assign({ likes: likes?.likes }, data);
        }),
      ),
    );
    if (providerId) {
      const [{ bookmarks }, { histories }] = (await Promise.all([
        this.bookmarkRepository.findBookmarksByProviderId(providerId),
        this.historyRepository.findHistoryByProviderId(providerId),
      ])) as [BookmarksModel, HistoryModel];
      if (bookmarks !== null && histories !== null) {
        const bookmarkList = bookmarks.map((b) => b.articleId);
        const historyList = histories.map((h) => h.articleId);
        ret.docs = ret.docs.map((doc: { [key: string]: any }) => {
          const articleId = doc.articleId;
          const isBookmarked = bookmarkList.includes(articleId);
          const isVisited = historyList.includes(articleId);
          return Object.assign({ isBookmarked, isVisited }, doc);
        });
      }
    }

    return ret;
  }
  async findLikesByArticleId(articleId: string) {
    return await this.likesRepository.findLikesByArticleId(articleId);
  }
  async saveLike(articleId: string, providerId: string, isLike: boolean) {
    const likesResponse = await this.likesRepository.saveLike(articleId, providerId, isLike);
    const [articleResponse, providerResponse] = await Promise.all([
      this.articleRepository.updateNumOfLikes(articleId, isLike),
      this.providerRepository.pushLikeRepositoryId(providerId, articleId, isLike),
    ]);
    return [likesResponse, articleResponse, providerResponse];
  }
}

export default new ArticleService();

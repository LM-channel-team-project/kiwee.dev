// repository
import articleRepository from '../repository/ArticleRepository';
import likesRepository from '../repository/LikesRepository';
import providerRepository from '../repository/providerRepository';
import bookmarkRepository from '../repository/BookmarkRepository';
import historyRepository from '../repository/HistoryRepository';

// type, interface
import { ArticleModel } from '../model/Article';
import { BookmarksModel } from '../model/Bookmarks';
import { HistoryModel } from '../model/History';

class ArticleService {
  private articleRepository = articleRepository;
  private likesRepository = likesRepository;
  private providerRepository = providerRepository;
  private bookmarkRepository = bookmarkRepository;
  private historyRepository = historyRepository;
  constructor() {}
  findArticleById(articleId: string) {
    return this.articleRepository.findArticleById(articleId);
  }
  async findArticlesByPage(
    page: number,
    providerId: string | undefined
  ): Promise<{ [key: string]: any }> {
    const result = await this.articleRepository.findArticlesByPage(page);
    let ret: { [key: string]: any } = { ...result };
    const articles = result.docs as ArticleModel[];
    ret.docs = await Promise.all(
      articles.map(article =>
        likesRepository.findLikesByArticleId(article.articleId).then(likes => {
          const ret: { [key: string]: any } = article;
          ret._doc.likes = likes?.likes;
          return ret;
        })
      )
    );

    if (providerId) {
      const [{ bookmarks }, { histories }] = (await Promise.all([
        this.bookmarkRepository.findBookmarksByProviderId(providerId),
        this.historyRepository.findHistoryByProviderId(providerId),
      ])) as [BookmarksModel, HistoryModel];
      if (bookmarks !== null && histories !== null) {
        const bookmarkList = bookmarks.map(b => b.articleId);
        const historyList = histories.map(h => h.articleId);
        ret.docs = ret.docs.map((doc: { [key: string]: any }) => {
          const isBookmarked = bookmarkList.includes(doc.articleId);
          const isVisited = historyList.includes(doc.articleId);
          return Object.assign({ isBookmarked, isVisited }, doc._doc);
        });
      }
    }

    return ret;
  }
  async findLikesByArticleId(articleId: string) {
    return await this.likesRepository.findLikesByArticleId(articleId);
  }
  async saveLike(articleId: string, providerId: string, isLike: boolean) {
    const likesResponse = await this.likesRepository.saveLike(
      articleId,
      providerId,
      isLike
    );
    const [articleResponse, providerResponse] = await Promise.all([
      this.articleRepository.increaseNumOfLikes(articleId, isLike),
      this.providerRepository.pushLikeRepositoryId(
        providerId,
        articleId,
        isLike
      ),
    ]);
    return [likesResponse, articleResponse, providerResponse];
  }
}

export default new ArticleService();

// repository
import articleRepository from '../repository/ArticleRepository';
import likeRepository from '../repository/LikeRepository';
import bookmarkRepository from '../repository/BookmarkRepository';
import historyRepository from '../repository/HistoryRepository';

// type, interface
import { ArticleModel } from '../model/Article';
import { ArticleInfoType } from '../type/ArticleType';

class ArticleService {
  private articleRepository = articleRepository;
  private likeRepository = likeRepository;
  private bookmarkRepository = bookmarkRepository;
  private historyRepository = historyRepository;
  constructor() {}

  // 아티클에 대한 유저 정보 조회 (좋아요, 북마크, 방문)
  async getInfo(articleId: string, providerId?: string, exclude: ArticleInfoType = {}) {
    if (!articleId) throw new Error('articleId가 없습니다.');
    if (!providerId) return { isLiked: false, isBookmarked: false, isVisited: false };
    const option: ArticleInfoType = {
      isLiked: false,
      isBookmarked: false,
      isVisited: false,
      ...exclude,
    };
    const target = {
      isLiked: this.likeRepository.findLikesByProviderId(providerId).then((like) => ({
        isLiked: like?.isLiked(articleId) || false,
      })),
      isBookmarked: this.bookmarkRepository
        .findBookmarksByProviderId(providerId)
        .then((bookmark) => ({ isBookmarked: bookmark?.isBookmarked(articleId) || false })),
      isVisited: this.historyRepository
        .findHistoryByProviderId(providerId)
        .then((history) => ({ isVisited: history?.isVisited(articleId) || false })),
    };
    const entries = Object.entries(option) as Array<[keyof ArticleInfoType, boolean]>;
    const promises: Promise<ArticleInfoType>[] = entries.map(([key, bool]) => {
      return (bool ? Promise.resolve({ [key]: true }) : target[key]) as Promise<ArticleInfoType>;
    });
    const articleInfo = await Promise.all(promises);
    return articleInfo.reduce((acc, cur) => {
      return { ...acc, ...cur };
    });
  }

  // 아티클 조회
  async findOneById(articleId: string, providerId?: string) {
    const promises: [Promise<ArticleModel | null>, Promise<ArticleInfoType>] = [
      this.articleRepository.findArticleById(articleId),
      this.getInfo(articleId, providerId),
    ];
    const [article, info] = await Promise.all(promises);
    if (!article) throw new Error('article is not found');
    const data = article.serialize();
    return { ...data, ...info } as Omit<ArticleModel, 'likes'> & ArticleInfoType;
  }

  // 전체 아티클 조회
  async findAllByPage(page: number, providerId?: string) {
    const { docs, ...pagenateData } = await this.articleRepository.findArticlesByPage(page);
    const promises = docs.map((article) => {
      return this.getInfo(article.articleId, providerId).then((info) => ({
        ...article.serialize(),
        ...info,
      }));
    });
    const refinedArticles = await Promise.all(promises);
    return { docs: refinedArticles, ...pagenateData };
  }

  // 전체 히스토리 아티클 조회
  async findAllByHistory(page: number, providerId: string) {
    const histories = await this.historyRepository.findHistoryByProviderId(providerId);
    if (!histories) throw new Error('유저의 히스토리 정보가 존재하지 않습니다.');
    const articleIds = histories.getArticleIds();
    if (!articleIds.length) return DUMY_PAGINATE_RESULT;
    const { docs, ...pagenateData } = await this.articleRepository.findArticleByIds(
      articleIds,
      page,
    );
    const promises = docs.map((article) => {
      return this.getInfo(article.articleId, providerId, { isVisited: true }).then((info) => ({
        ...article.serialize(),
        ...info,
      }));
    });
    const historyArticles = await Promise.all(promises);
    return { docs: historyArticles, ...pagenateData };
  }

  // 전체 북마크 아티클 조회
  async findAllByBookmark(page: number, providerId: string) {
    const bookmarks = await this.bookmarkRepository.findBookmarksByProviderId(providerId);
    if (!bookmarks) throw new Error('유저의 북마크 정보가 존재하지 않습니다.');
    const articleIds = bookmarks.getArticleIds();
    if (!articleIds.length) return DUMY_PAGINATE_RESULT;
    const { docs, ...pagenateData } = await this.articleRepository.findArticleByIds(
      articleIds,
      page,
    );
    const promises = docs.map((article) => {
      return this.getInfo(article.articleId, providerId, { isBookmarked: true }).then((info) => ({
        ...article.serialize(),
        ...info,
      }));
    });
    const bookmarkArticles = await Promise.all(promises);
    return { docs: bookmarkArticles, ...pagenateData };
  }

  // 전체 좋아요 아티클 조회
  async findAllByLike(page: number, providerId: string) {
    const likes = await this.likeRepository.findLikesByProviderId(providerId);
    if (!likes) throw new Error('유저의 좋아요 정보가 존재하지 않습니다.');
    const articleIds = likes.getArticleIds();
    if (!articleIds.length) return DUMY_PAGINATE_RESULT;
    const { docs, ...pagenateData } = await this.articleRepository.findArticleByIds(
      articleIds,
      page,
    );
    const promises = docs.map((article) => {
      return this.getInfo(article.articleId, providerId, { isLiked: true }).then((info) => ({
        ...article.serialize(),
        ...info,
      }));
    });
    const likeArticles = await Promise.all(promises);
    return { docs: likeArticles, ...pagenateData };
  }

  // 아티클 좋아요 업데이트
  async updateOneByLike(providerId: string, articleId: string, isSave: boolean) {
    const promises = isSave
      ? [
          this.likeRepository.insertLike(providerId, articleId),
          this.articleRepository.updateNumOfLikes(articleId, true),
        ]
      : [
          this.likeRepository.removeLike(providerId, articleId),
          this.articleRepository.updateNumOfLikes(articleId, false),
        ];
    const [likeResult, numOfLikesResult] = await Promise.all(promises);
    if (!likeResult.ok || !numOfLikesResult.ok) return false;
    return true;
  }
}

const DUMY_PAGINATE_RESULT = {
  docs: [],
  hasNextPage: false,
  hasPrevPage: false,
  limit: 20,
  nextPage: null,
  page: 1,
  pagingCounter: 1,
  prevPage: null,
  totalDocs: 0,
  totalPages: 1,
};

export default new ArticleService();

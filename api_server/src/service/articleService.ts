// repository
import articleRepository from '../repository/ArticleRepository';
import likesRepository from '../repository/LikesRepository';
import providerRepository from '../repository/providerRepository';
import bookmarkRepository from '../repository/BookmarkRepository';

// type, interface
import { ArticleModel } from '../model/Article';
import ArticleType from '../type/ArticleType';
import { BookmarksModel } from '../model/Bookmarks';

class ArticleService {
  private articleRepository = articleRepository;
  private likesRepository = likesRepository;
  private providerRepository = providerRepository;
  private bookmarkRepository = bookmarkRepository;
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
      const { bookmarks } =
        (await this.bookmarkRepository.findBookmarksByProviderId(
          providerId
        )) as BookmarksModel;
      console.log(bookmarks);
      if (bookmarks !== null) {
        const bookmarkList = bookmarks.map(b => b.articleId);
        console.log(bookmarkList);
        ret.docs = ret.docs.map((doc: { [key: string]: any }) => {
          const isBookmarked = bookmarkList.includes(doc.articleId);
          return Object.assign({ isBookmarked }, doc._doc);
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
    const articleResponse = await this.articleRepository.increaseNumOfLikes(
      articleId,
      isLike
    );
    const providerResponse = await this.providerRepository.pushLikeRepositoryId(
      providerId,
      articleId,
      isLike
    );
    console.log(providerResponse);
    return [likesResponse, articleResponse, providerResponse];
  }
}

export default new ArticleService();

// repository
import articleRepository from '../repository/ArticleRepository';
import likesRepository from '../repository/LikesRepository';
import providerRepository from '../repository/providerRepository';

// type, interface
import { ArticleModel } from '../model/Article';

class ArticleService {
  private articleRepository = articleRepository;
  private likesRepository = likesRepository;
  private providerRepository = providerRepository;
  constructor() {}
  findArticleById(articleId: string) {
    return this.articleRepository.findArticleById(articleId);
  }
  async findArticlesByPage(page: number): Promise<{ [key: string]: any }> {
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

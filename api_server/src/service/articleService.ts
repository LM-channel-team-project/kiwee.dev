import { PaginateResult } from 'mongoose';

// repository
import articleRepository from '../repository/ArticleRepository';
import likesRepository from '../repository/LikesRepository';

// type, interface
import { ArticleModel } from '../model/Article';

class ArticleService {
  articleRepository = articleRepository;
  likesRepository = likesRepository;
  constructor() {}
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
    console.log(ret);
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
    return [likesResponse, articleResponse];
  }
}

export default new ArticleService();

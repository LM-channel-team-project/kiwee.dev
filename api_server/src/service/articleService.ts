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
  async findArticlesByPage(
    page: number
  ): Promise<PaginateResult<ArticleModel>> {
    return await this.articleRepository.findArticlesByPage(page);
  }
  async findLikesByArticleId(articleId: string) {
    return await this.likesRepository.findLikesByArticleId(articleId);
  }
  async saveLike(articleId: string, providerId: string, isLike: boolean) {
    return await Promise.all([
      this.likesRepository.saveLike(articleId, providerId, isLike),
      this.articleRepository.increaseNumOfLikes(articleId, isLike),
    ]);
  }
}

export default new ArticleService();

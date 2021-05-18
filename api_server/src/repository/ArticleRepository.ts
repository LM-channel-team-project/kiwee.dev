import { PaginateOptions, PaginateResult } from 'mongoose';
import Article, { ArticleModel } from '../model/Article';

const ArticleRepository = class {
  private Article = Article;
  private paginateOptions: PaginateOptions = {
    limit: 20,
    sort: {
      insertDate: -1,
    },
  };
  constructor() {}
  async findArticlesByPage(
    page: number
  ): Promise<PaginateResult<ArticleModel>> {
    return await this.Article.paginate({}, { ...this.paginateOptions, page });
  }
  async increaseNumOfLikes(articleId: string, isLike: boolean) {
    return await this.Article.updateOne(
      { articleId },
      { $inc: { numOfLikes: isLike ? 1 : -1 } },
      {
        new: true,
      }
    ).exec();
  }
};

export default new ArticleRepository();

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
  findArticleById(articleId: string) {
    return this.Article.findOne({ articleId }).exec();
  }
  findArticlesByPage(page: number): Promise<PaginateResult<ArticleModel>> {
    return this.Article.paginate({}, { ...this.paginateOptions, page });
  }
  increaseNumOfLikes(articleId: string, isLike: boolean) {
    return this.Article.updateOne(
      { articleId },
      { $inc: { numOfLikes: isLike ? 1 : -1 } },
      {
        new: true,
      }
    ).exec();
  }
  isExist(articleId: string) {
    return this.Article.exists({ articleId });
  }
};

export default new ArticleRepository();

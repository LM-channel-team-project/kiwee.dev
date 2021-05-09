import { PaginateOptions, PaginateResult } from 'mongoose';
import Article, {ArticleModel} from '../model/Article';

const RssFeedRepository = class {
  private article;
  private paginateOptions: PaginateOptions = {
    limit: 20,
    sort: {
      insertDate: -1
    }
  };
  constructor(article: typeof Article) {
    this.article = article;
  }
  async pagenateFeed(
    page: number
  ): Promise<{
    code: number;
    data?: PaginateResult<ArticleModel>;
    message?: string;
  }> {
    try {
      const result = await this.article.paginate(
        {},
        { ...this.paginateOptions, page }
      );
      console.log(result);
      return {
        code: 200,
        data: result,
        message: '정상적으로 처리되었습니다.'
      };
    } catch (e) {
      console.log(e);
      return {
        code: 503,
        message: '에러가 발생했습니다.',
      };
    }
  }
};

export default new RssFeedRepository(Article);

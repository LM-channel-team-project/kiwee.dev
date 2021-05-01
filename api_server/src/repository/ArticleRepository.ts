import ArticleModel from '../model/Article';

const RssFeedRepository = class {
  private articleModel;
  private paginateOptions = {
    limit: 20,
  };
  constructor(articleModel: typeof ArticleModel) {
    this.articleModel = articleModel;
  }
  async pagenateFeed(
    page: number
  ): Promise<{
    code: number;
    payload: any;
  }> {
    try {
      const result = await this.articleModel.paginate(
        {},
        { ...this.paginateOptions, page }
      );
      console.log(result);
      return {
        code: 200,
        payload: result,
      };
    } catch (e) {
      console.log(e);
      return {
        code: 503,
        payload: '에러가 발생했습니다.',
      };
    }
  }
};

export default new RssFeedRepository(ArticleModel);

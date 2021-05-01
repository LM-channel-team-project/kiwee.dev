import { v4 as uuidV4 } from 'uuid';

import ArticleModel from '../model/Article';
export interface SaveArticleProps {
  providerId: string;
  title: string;
  insertDate: Date;
  thumbnail: string;
  providerName: string;
  providerAvatar: string;
  articleUrl: string;
  keywords: string[];
}

const RssFeedRepository = class {
  private rssFeedModel;
  constructor(rssFeedModel: typeof ArticleModel) {
    this.rssFeedModel = rssFeedModel;
  }
  async saveRssFeed(saveRssFeedProps: SaveArticleProps) {
    try {
      const articleId = uuidV4();
      const rssFeed = new this.rssFeedModel({
        ...saveRssFeedProps,
        articleId,
      });
      return this.rssFeedModel.create(rssFeed);
    } catch (e) {
      console.log(e);
      return {
        code: 503,
        message: '에러가 발생했습니다.',
      };
    }
  }
};

export default new RssFeedRepository(ArticleModel);

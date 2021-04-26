import { v4 as uuidV4 } from 'uuid';

import RssFeedModel from '../model/RssFeed';
import ContentsParser from '../util/contentsParser';
export interface SaveRssFeedProps {
  rssProviderId: string;
  title: string;
  contents: string;
  thumbnail: string;
  providerName: string;
  providerAvatar: string;
}

const RssFeedRepository = class {
  private rssFeedModel;
  private contentsParser;

  private paginateOptions = {
    limit: 20,
  };

  constructor(
    rssFeedModel: typeof RssFeedModel,
    contentsParser: typeof ContentsParser
  ) {
    this.rssFeedModel = rssFeedModel;
    this.contentsParser = contentsParser;
  }
  async saveRssFeed(
    saveRssFeedProps: SaveRssFeedProps
  ): Promise<{
    code: number;
    message: string;
  }> {
    const rssFeedId = uuidV4();
    const preivew = this.contentsParser.getPreview(saveRssFeedProps.contents);
    const keywords = this.contentsParser.extractKeyword(
      saveRssFeedProps.contents
    );
    const insertDate = new Date();
    try {
      const rssFeed = new this.rssFeedModel({
        ...saveRssFeedProps,
        rssFeedId,
        preivew,
        keywords,
        insertDate,
      });
      await this.rssFeedModel.create(rssFeed);
      return {
        code: 200,
        message: '성공적으로 저장되었습니다.',
      };
    } catch (e) {
      console.log(e);
      return {
        code: 503,
        message: '에러가 발생했습니다.',
      };
    }
  }
  async pagenateFeed(
    page: number
  ): Promise<{
    code: number;
    payload: any;
  }> {
    try {
      const result = await RssFeedModel.paginate(
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

export default new RssFeedRepository(RssFeedModel, ContentsParser);

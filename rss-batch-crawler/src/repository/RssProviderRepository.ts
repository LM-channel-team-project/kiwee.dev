import { v4 as uuidV4 } from 'uuid';
import RssProviderModel from '../model/RssProvider';
import { RssProviderType } from '../type/RssProviderType';

const RssProviderRepository = class {
  private rssProviderModel = RssProviderModel;

  createRssProvider = async ({
    providerEmail,
    providerAvatar,
    providerName,
    providerType,
    rssLink,
  }: RssProviderType): Promise<{
    code: number;
    message: string;
  }> => {
    const isExist = await this.rssProviderModel.exists({ providerEmail });
    if (isExist)
      return {
        code: 400,
        message: '이미 존재하는 이메일입니다.',
      };
    try {
      const providerId = uuidV4();
      const lastModifiedTime = new Date();
      const rssProvider = new RssProviderModel({
        providerId,
        providerEmail,
        providerName,
        providerAvatar,
        providerType,
        rssLink,
        lastModifiedTime,
        numOfArticles: 0,
      });
      await this.rssProviderModel.create(rssProvider);
      return {
        code: 200,
        message: '성공적으로 등록되엇습니다.',
      };
    } catch (e) {
      console.log(e.message);
      return {
        code: 503,
        message: '오류가 발생했습니다.',
      };
    }
  };
};

export default new RssProviderRepository();
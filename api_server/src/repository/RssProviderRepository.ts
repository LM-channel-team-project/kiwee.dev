import { v4 as uuidV4 } from 'uuid';
import RssProviderModel from '../model/RssProvider';
import { providerType, RssProviderType } from '../type/RssProviderType';

export interface SaveRssProviderProps {
  providerName: string;
  providerEmail: string;
  providerAvatar?: string;
  providerType: providerType;
  rssLink: String;
}

const RssProviderRepository = class {
  private rssProviderModel = RssProviderModel;

  saveRssProvider = async ({
    providerEmail,
    providerAvatar,
    providerName,
    providerType,
    rssLink,
  }: SaveRssProviderProps): Promise<{
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
        message: '성공적으로 등록되었습니다.',
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
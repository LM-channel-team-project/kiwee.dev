import { v4 as uuidV4 } from 'uuid';
import RssProviderModel from '../model/RssProvider';

export interface SaveProviderProps {
  providerEmail: string;
  providerName: string;
  providerAvatar?: string;
  rssLink: String;
}

const RssProviderRepository = class {
  private rssProviderModel = RssProviderModel;

  saveRssProvider = async ({
    providerEmail,
    providerAvatar,
    providerName,
    rssLink,
  }: SaveProviderProps): Promise<{
    code: number;
    message: string;
  }> => {
    try {
      const providerId = uuidV4();
      const lastModifiedTime = new Date();
      const rssProvider = new RssProviderModel({
        providerId,
        providerEmail,
        providerName,
        providerAvatar,
        rssLink,
        lastModifiedTime,
        numOfArticles: 0,
      });
      await this.rssProviderModel.create(rssProvider);
      return {
        code: 201,
        message: '성공적으로 등록되었습니다.',
      };
    } catch (e) {
      console.log(e.message);
      return {
        code: 500,
        message: '오류가 발생했습니다.',
      };
    }
  };
};

export default new RssProviderRepository();

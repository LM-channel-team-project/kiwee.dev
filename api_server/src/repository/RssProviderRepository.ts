import { v4 as uuidV4 } from 'uuid';
import RssProvider from '../model/RssProvider';
import { RssProviderType } from '../type/RssProviderType';

export interface SaveProviderProps {
  providerEmail: string;
  providerName: string;
  providerAvatar: string;
}

const RssProviderRepository = class {
  private RssProvider = RssProvider;

  saveRssProvider = async ({
    providerEmail,
    providerAvatar,
    providerName,
  }: SaveProviderProps): Promise<{
    code: number;
    message: string;
    data?: RssProviderType;
  }> => {
    try {
      const providerId = uuidV4();
      const lastModifiedTime = new Date(1970, 1, 1);
      const rssLink = '';
      const updateResponse = await this.RssProvider.updateOne(
        { providerEmail },
        {
          providerId,
          providerEmail,
          providerName,
          providerAvatar,
          rssLink,
          lastModifiedTime,
        },
        { new: true, upsert: true }
      ).exec();
      console.log(updateResponse);
      return {
        code: 201,
        message:
          updateResponse.n === 0
            ? '성공적으로 등록되었습니다.'
            : '로그인에 성공하였습니다.',
        data: {
          providerId,
          providerEmail,
          providerName,
          providerAvatar,
          rssLink,
          lastModifiedTime,
        },
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

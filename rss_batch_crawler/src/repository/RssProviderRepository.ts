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

  async findAllRssProvider() {
    return this.rssProviderModel.find().exec();
  }
  async updateLastModifiedTime(providerId: string, lastModifiedTime: Date) {
    return this.rssProviderModel
      .updateOne({ providerId }, { lastModifiedTime }, { new: true })
      .exec();
  }
};

export default new RssProviderRepository();

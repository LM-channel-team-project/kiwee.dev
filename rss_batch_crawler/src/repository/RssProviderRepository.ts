import RssProviderModel from '../model/RssProvider';

export interface SaveRssProviderProps {
  providerName: string;
  providerEmail: string;
  providerAvatar?: string;
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

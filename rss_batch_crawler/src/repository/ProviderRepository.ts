import Provider from '../model/Provider';

export interface SaveProviderProps {
  providerName: string;
  providerEmail: string;
  providerAvatar?: string;
  rssLink: String;
}
const ProviderRepository = class {
  private Provider = Provider;
  constructor() {}
  async findAllRssProvider() {
    return await this.Provider.find().exec();
  }
  async updateLastModifiedTime(providerId: string, lastModifiedTime: Date) {
    return await this.Provider.updateOne(
      { providerId },
      { lastModifiedTime },
      { new: true }
    ).exec();
  }
  async findProviderbyId(providerId: string) {
    return await this.Provider.findOne({ providerId }).exec();
  }
};
export default new ProviderRepository();

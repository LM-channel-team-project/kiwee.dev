import { FilterQuery } from 'mongoose';
import Provider, { ProviderModel } from '../model/Provider';
export interface SaveProviderProps {
  providerId: string;
  email: string;
  name: string;
  avatar: string;
}

class providerRepository {
  private Provider = Provider;
  constructor() {}
  async isExist(providerId: string) {
    return await this.Provider.exists({ providerId });
  }
  async updateProvider({ providerId, email, avatar, name }: SaveProviderProps) {
    return await this.Provider.updateOne(
      { providerId },
      {
        $set: {
          email,
          name,
          avatar,
        },
      },
      { new: true },
    ).exec();
  }
  async createProvider({ providerId, email, avatar, name }: SaveProviderProps) {
    const lastModifiedTime = new Date(1970, 1, 1);
    const rssLink = 'default';
    return await this.Provider.findOneAndUpdate(
      { providerId },
      {
        providerId,
        email,
        name,
        avatar,
        rssLink,
        lastModifiedTime,
      },
      {
        new: true,
        upsert: true,
      },
    );
  }
  async findByQuery(query: FilterQuery<ProviderModel>) {
    return this.Provider.find(query, { _id: 0, providerId: 0, lastModifiedTime: 0 });
  }
  async findOneByProviderId(providerId: string) {
    return await this.Provider.findOne(
      { providerId },
      { _id: 0, providerId: 0, lastModifiedTime: 0 },
    );
  }
  async resetLastModifiedTimes() {
    return await this.Provider.updateMany(
      {},
      { lastModifiedTime: new Date(0) },
      { new: true },
    ).exec();
  }
  async saveRssUrl(providerId: string, RssLink: string) {
    return await this.Provider.updateOne(
      { providerId },
      { $set: { RssLink } },
      { new: true },
    ).exec();
  }
}

export default new providerRepository();

import Provider from '../model/Provider';
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
      { new: true }
    ).exec();
  }
  async createProvider({ providerId, email, avatar, name }: SaveProviderProps) {
    const lastModifiedTime = new Date(1970, 1, 1);
    const rssLink = 'default';
    return await this.Provider.create({
      providerId,
      email,
      name,
      avatar,
      rssLink,
      lastModifiedTime,
    });
  }

  async findProviderById(providerId: string) {
    return await this.Provider.findOne(
      { providerId },
      { _id: 0, email: 1, name: 1, avatar: 1, rssLink: 1 }
    ).exec();
  }
  async resetLastModifiedTimes() {
    return await this.Provider.updateMany(
      {},
      { lastModifiedTime: new Date(0) },
      { new: true }
    ).exec();
  }
}

export default new providerRepository();

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
      { new: true }
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
      }
    );
  }

  async findProviderById(providerId: string) {
    return await this.Provider.findOne(
      { providerId },
      { _id: 0, email: 1, name: 1, avatar: 1, rssLink: 1, likes: 1 }
    ).exec();
  }
  async resetLastModifiedTimes() {
    return await this.Provider.updateMany(
      {},
      { lastModifiedTime: new Date(0) },
      { new: true }
    ).exec();
  }
  async saveRssUrl(providerId: string, RssLink: string) {
    return await this.Provider.updateOne(
      { providerId },
      { $set: { RssLink } },
      { new: true }
    ).exec();
  }

  async pushLikeRepositoryId(
    providerId: string,
    articleId: string,
    isLike: boolean
  ) {
    const { likes } = (await this.Provider.findOne({
      providerId,
    }).exec()) as ProviderModel;

    console.log('provider likes: ', likes, articleId);

    if (!likes) return;

    const isExist = likes.includes(articleId);
    if (isLike) {
      if (isExist) return;
      return this.Provider.findOneAndUpdate(
        { providerId },
        { $push: { likes: articleId } },
        { new: true }
      ).exec();
    }
    if (!isExist) return;
    console.log('REMOVE!');
    return this.Provider.findOneAndUpdate(
      { providerId },
      { $pull: { likes: articleId } },
      { new: true }
    ).exec();
  }
}

export default new providerRepository();

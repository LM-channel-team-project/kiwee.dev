import ProviderRepository, {
  SaveProviderProps,
} from '../repository/providerRepository';
import BookmarkRepository from '../repository/BookmarkRepository';
class ProviderService {
  providerRepository = ProviderRepository;
  bookmarkRepository = BookmarkRepository;
  constructor() {}
  async saveProvider({ providerId, email, avatar, name }: SaveProviderProps) {
    const isExist = await this.providerRepository.isExist(providerId);
    let ret;
    if (isExist) {
      const [res1, res2] = await Promise.all([
        this.bookmarkRepository.createBookmarks(providerId),
        this.providerRepository.updateProvider({
          providerId,
          email,
          avatar,
          name,
        }),
      ]);
      console.log('user data exist', res1, res2);
    } else {
      const [res1, res2] = await Promise.all([
        this.bookmarkRepository.createBookmarks(providerId),
        this.providerRepository.createProvider({
          providerId,
          email,
          avatar,
          name,
        }),
      ]);
      console.log('create bookmark', res1);
      console.log('create new user', res2);
      ret = res2;
    }
    return ret;
  }
  async findProviderById(providerId: string) {
    return await this.providerRepository.findProviderById(providerId);
  }
  async resetLastModifiedTime() {
    return await this.providerRepository.resetLastModifiedTimes();
  }
  async saveRssUrl(providerId: string, RssUrl: string) {
    return await this.providerRepository.saveRssUrl(providerId, RssUrl);
  }
}

export default new ProviderService();

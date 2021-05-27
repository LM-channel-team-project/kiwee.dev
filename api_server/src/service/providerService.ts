import providerRepository, {
  SaveProviderProps,
} from '../repository/providerRepository';
import bookmarkRepository from '../repository/BookmarkRepository';
import HistoryRepository from '../repository/HistoryRepository';
class ProviderService {
  private providerRepository = providerRepository;
  private bookmarkRepository = bookmarkRepository;
  private historyRepository = HistoryRepository;

  constructor() {}
  async saveProvider({ providerId, email, avatar, name }: SaveProviderProps) {
    const results = await Promise.all([
      this.bookmarkRepository.createBookmarks(providerId),
      this.historyRepository.createHistory(providerId),
      this.providerRepository.createProvider({
        providerId,
        email,
        avatar,
        name,
      }),
    ]);
    return results;
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

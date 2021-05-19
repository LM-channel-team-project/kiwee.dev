import { throws } from 'node:assert';
import bookmarkRepository from '../repository/BookmarkRepository';

class BookmarkService {
  private bookmarkRepository = bookmarkRepository;
  constructor() {}
  async findBookmarkByProviderId(providerId: string) {
    return await this.bookmarkRepository.findBookmarksByProviderId(providerId);
  }
}
export default new BookmarkService();

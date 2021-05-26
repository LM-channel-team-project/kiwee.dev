import { throws } from 'node:assert';
import { BookmarksModel } from '../model/Bookmarks';
import bookmarkRepository from '../repository/BookmarkRepository';

class BookmarkService {
  private bookmarkRepository = bookmarkRepository;
  constructor() {}
  async findBookmarkByProviderId(providerId: string) {
    return await this.bookmarkRepository.findBookmarksByProviderId(providerId);
  }

  async updateBookmark(providerId: string, articleId: string, isSave: boolean) {
    const { bookmarks } =
      (await this.bookmarkRepository.findBookmarksByProviderId(
        providerId
      )) as BookmarksModel;
    if (!bookmarks) throw new Error('존재하지 않는 회원입니다.');

    const isExist = bookmarks.some(
      bookmark => bookmark.articleId === articleId
    );
    if (isSave) {
      if (isExist) throw new Error('이미 등록된 article입니다.');
      return this.bookmarkRepository.insertBookmark(providerId, articleId);
    }
    if (!isExist) throw new Error('등록되지 않은 article입니다.');
    return this.bookmarkRepository.removeBookmark(providerId, articleId);
  }
}
export default new BookmarkService();

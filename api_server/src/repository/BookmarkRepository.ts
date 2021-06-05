import { Model } from 'mongoose';
import Bookmarks, { BookmarksModel } from '../model/Bookmarks';

class BookmarksRepository {
  private Bookmarks: Model<BookmarksModel>;
  constructor(Bookmarks: Model<BookmarksModel>) {
    this.Bookmarks = Bookmarks;
  }
  async createBookmarks(providerId: string) {
    const isExist = await this.Bookmarks.exists({ providerId });
    if (isExist) return;
    return await this.Bookmarks.create({
      providerId,
      bookmarks: [],
    });
  }
  async insertBookmark(providerId: string, articleId: string) {
    return await this.Bookmarks.updateOne(
      { providerId },
      {
        $push: {
          bookmarks: {
            articleId,
            insertDate: new Date(),
          },
        },
      },
      { new: true },
    ).exec();
  }
  async removeBookmark(providerId: string, articleId: string) {
    return await this.Bookmarks.updateOne(
      { providerId },
      { $pull: { bookmarks: { articleId } } },
      { new: true },
    ).exec();
  }
  async findBookmarksByProviderId(providerId: string) {
    return await this.Bookmarks.findOne({ providerId }).exec();
  }
}

export default new BookmarksRepository(Bookmarks);

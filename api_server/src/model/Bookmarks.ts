import { Document, Schema, model, PaginateModel } from 'mongoose';

import BookmarksType from '../type/BookmarksType';

export interface BookmarksModel extends BookmarksType, Document {
  getArticleIds(): string[];
  isBookmarked(articleId: string): boolean;
}
const BookmarksSchema = new Schema<BookmarksModel>(
  {
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    bookmarks: [
      {
        articleId: {
          type: String,
          index: true,
        },
        insertedDate: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    versionKey: false,
  },
);

// 북마크에서 아티클 아이디만 가져오는 인스턴스 메서드
BookmarksSchema.methods.getArticleIds = function () {
  return this.bookmarks.map((boomark) => boomark.articleId);
};
// 북마크에서 아티클 있는지 확인
BookmarksSchema.methods.isBookmarked = function (articleId: string) {
  return this.bookmarks.some((bookmark) => bookmark.articleId === articleId);
};
export default model<BookmarksModel>('Bookmarks', BookmarksSchema);

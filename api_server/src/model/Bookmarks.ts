import { Document, Schema, model, PaginateModel } from 'mongoose';

import BookmarksType from '../type/BookmarksType';

export interface BookmarksModel extends BookmarksType, Document {}
const BookmarksSchema = new Schema(
  {
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    bookmarks: [
      {
        articleId: String,
        insertedDate: Date,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default model<BookmarksModel>('Bookmarks', BookmarksSchema);

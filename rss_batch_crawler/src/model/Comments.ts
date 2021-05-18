import { Document, Schema, model } from 'mongoose';

import CommentsType from '../type/CommentsType';

export interface CommentsModel extends CommentsType, Document {}
const CommentsSchema = new Schema(
  {
    articleId: {
      type: String,
      required: true,
      unique: true,
    },
    comments: [
      {
        providerId: String,
        name: String,
        avatar: String,
        content: String,
        insertedDate: Date,
        lastUpdatedDate: Date,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default model<CommentsModel>('Comments', CommentsSchema);

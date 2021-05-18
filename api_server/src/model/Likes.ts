import { Document, Schema, model } from 'mongoose';

import LikeType from '../type/LikeType';

export interface LikeModel extends LikeType, Document {}
const LikesSchema = new Schema(
  {
    articleId: {
      type: String,
      required: true,
      unique: true,
    },
    likes: [
      {
        providerId: { type: String, required: true },
        insertDate: { type: String, required: true, default: new Date() },
      },
    ],
  },
  {
    versionKey: false,
  }
);

export default model<LikeModel>('Likes', LikesSchema);

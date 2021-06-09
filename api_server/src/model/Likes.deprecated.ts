import { Document, Schema, model } from 'mongoose';

import { LikeDeprecatedType } from '../type/LikeType';

export interface LikeModel extends LikeDeprecatedType, Document {}
const LikesSchema = new Schema<LikeModel>(
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
  },
);

export default model<LikeModel>('Likes-deprecated', LikesSchema, 'likes-deprecated');

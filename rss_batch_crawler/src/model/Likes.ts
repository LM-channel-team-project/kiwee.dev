import { Document, Schema, model } from 'mongoose';

import LikeType from '../type/LikesType';

export interface LikeModel extends LikeType, Document {}
const LikesSchema = new Schema(
  {
    articleId: {
      type: String,
      required: true,
      unique: true,
    },
    likes: {
      type: Array,
      required: true,
      default: new Array<string>(),
    },
  },
  {
    versionKey: false,
  }
);

export default model<LikeModel>('Likes', LikesSchema);

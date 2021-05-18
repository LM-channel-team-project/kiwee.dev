import { Document, Schema, model, connection } from 'mongoose';

import ArticleType from '../type/ArticleType';

export interface ArticleModel extends ArticleType, Document {}
const ArticleSchema = new Schema({
  articleId: {
    type: String,
    required: true,
    unique: true,
  },
  articleUrl: {
    type: String,
    required: true,
  },
  provider: {
    providerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  numOfLikes: {
    type: Number,
    default: 0,
    required: true,
  },
  numOfComments: {
    type: Number,
    default: 0,
    required: true,
  },
  insertDate: { type: Date, default: new Date(), required: true },
  keywords: {
    type: Array,
    default: new Array<string>(),
  },
});
export default model<ArticleModel>('Article', ArticleSchema);

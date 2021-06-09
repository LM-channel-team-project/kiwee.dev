import { Document, Schema, model, PaginateModel, connection } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import ArticleType from '../type/ArticleType';

export interface ArticleModel extends ArticleType, Document {
  serialize(): Omit<ArticleType, 'likes'>;
}
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
    index: true,
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

ArticleSchema.methods.serialize = function () {
  const { __v, _id, ...data } = this.toObject();
  return data;
};
ArticleSchema.plugin(mongoosePaginate);
export default model<ArticleModel, PaginateModel<ArticleModel>>('Article', ArticleSchema);

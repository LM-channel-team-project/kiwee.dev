import { Document, Schema, model } from 'mongoose';
import RssFeedType from '../type/RssFeedType';

export interface RssFeedModel extends RssFeedType, Document {}
const RssFeedSchema = new Schema({
  rssProviderId: {
    type: String,
    required: true,
    unique: true,
  },
  rssFeedId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  insertDate: { type: Date, default: new Date() },
  providerName: {
    type: String,
    required: true,
    unique: true,
  },
  providerAvatar: {
    type: String,
  },
  keywords: {
    type: Array,
    default: new Array<string>(),
  },
});

export default model<RssFeedModel>('RssFeed', RssFeedSchema);

import { Document, Schema, model } from 'mongoose';
import { RssProviderType } from '../type/RssProviderType';

export interface RssProviderModel extends RssProviderType, Document {}
const RssProviderSchema = new Schema(
  {
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    providerEmail: { type: String, required: true, unique: true },
    providerName: { type: String, required: true },
    providerAvatar: { type: String },
    rssLink: {
      type: String,
      required: true,
    },
    lastModifiedTime: Date,
  },
  {
    versionKey: false,
  }
);

export default model<RssProviderModel>('RssProvider', RssProviderSchema);

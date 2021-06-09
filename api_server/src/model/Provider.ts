import { Document, Schema, model } from 'mongoose';
import { ProviderType } from '../type/ProviderType';

export interface ProviderModel extends ProviderType, Document {}
const ProviderSchema = new Schema(
  {
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    email: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    rssLink: {
      type: String,
      required: true,
    },
    lastModifiedTime: Date,
  },
  {
    versionKey: false,
  },
);

export default model<ProviderModel>('Provider', ProviderSchema);

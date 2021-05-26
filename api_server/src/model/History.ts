import { Document, Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import HistoryType from '../type/HistoryType';

export interface HistoryModel extends HistoryType, Document {}
const HisotorySchema = new Schema({
  providerId: {
    type: String,
    required: true,
  },
  histories: [
    {
      articleId: {
        type: String,
        required: true,
      },
      insertDate: {
        type: String,
        requied: true,
        default: new Date(),
      },
    },
  ],
});

export default model<HistoryModel>('History', HisotorySchema);

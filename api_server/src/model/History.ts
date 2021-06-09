import { Document, Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import HistoryType from '../type/HistoryType';

export interface HistoryModel extends HistoryType, Document {
  getArticleIds(): string[];
  isVisited(articleId: string): boolean;
}
const HistorySchema = new Schema<HistoryModel>({
  providerId: {
    type: String,
    required: true,
    unique: true,
  },
  histories: [
    {
      articleId: {
        type: String,
        index: true,
      },
      insertedDate: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

// 히스토리에서 아티클 아이디만 가져오는 인스턴스 메서드
HistorySchema.methods.getArticleIds = function () {
  return this.histories.map((history) => history.articleId);
};
// 히스토리에서 아티클 있는지 확인
HistorySchema.methods.isVisited = function (articleId: string) {
  return this.histories.some((history) => history.articleId === articleId);
};

export default model<HistoryModel>('History', HistorySchema);

import { Document, Schema, model, PaginateModel } from 'mongoose';

import LikesType from '../type/LikeType';

export interface LikesModel extends LikesType, Document {
  getArticleIds(): string[];
  isLiked(articleId: string): boolean;
}
const LikesSchema = new Schema<LikesModel>(
  {
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    likes: [
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
  },
  {
    versionKey: false,
  },
);

// 좋아요에서 아티클 아이디만 가져오는 인스턴스 메서드
LikesSchema.methods.getArticleIds = function () {
  return this.likes.map((like) => like.articleId);
};
// 좋아요에서 아티클이 있는지 확인 (좋아요 했는지)
LikesSchema.methods.isLiked = function (articleId: string) {
  return this.likes.some((like) => like.articleId === articleId);
};

export default model<LikesModel>('Like', LikesSchema);

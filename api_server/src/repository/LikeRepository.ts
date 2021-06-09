import { Model } from 'mongoose';
import Likes, { LikesModel } from '../model/Likes';

class LikesRepository {
  private Likes: Model<LikesModel>;
  constructor(Likes: Model<LikesModel>) {
    this.Likes = Likes;
  }
  async createLikes(providerId: string) {
    const isExist = await this.Likes.exists({ providerId });
    if (isExist) return;
    return await this.Likes.create({
      providerId,
      likes: [],
    });
  }
  insertLike(providerId: string, articleId: string) {
    return this.Likes.updateOne(
      { providerId },
      { $push: { likes: { articleId, insertDate: new Date() } } },
      { new: true },
    ).exec();
  }
  removeLike(providerId: string, articleId: string) {
    return this.Likes.updateOne(
      { providerId },
      { $pull: { likes: { articleId } } },
      { new: true },
    ).exec();
  }

  async findLikesByProviderId(providerId: string) {
    return await this.Likes.findOne({ providerId }, { Likes: { _id: 0 } }).exec();
  }
}

export default new LikesRepository(Likes);

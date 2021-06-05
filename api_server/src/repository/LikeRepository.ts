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
  async insertLike(providerId: string, articleId: string) {
    return await this.Likes.updateOne(
      { providerId },
      {
        $push: {
          likes: {
            articleId,
            insertDate: new Date(),
          },
        },
      },
      { new: true },
    ).exec();
  }
  async removeLike(providerId: string, articleId: string) {
    return await this.Likes.updateOne(
      { providerId },
      { $pull: { Likes: { articleId } } },
      { new: true },
    ).exec();
  }
  async findLikesByProviderId(providerId: string) {
    console.log(providerId);
    return await this.Likes.findOne({ providerId }).exec();
  }
}

export default new LikesRepository(Likes);

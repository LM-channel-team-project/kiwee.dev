import Likes from '../model/Likes.deprecated';

class LikesRepository {
  Likes = Likes;
  constructor() {}
  async findLikesByArticleId(articleId: string) {
    return await Likes.findOne({ articleId }, { _id: 0, articleId: 0 }).exec();
  }
  async saveLike(articleId: string, providerId: string, isLike: boolean) {
    const filtered = await Likes.aggregate([
      { $match: { articleId } },
      { $unwind: '$likes' },
      { $match: { 'likes.providerId': providerId } },
    ]);
    const isExist = filtered.length > 0;
    if (isLike) {
      if (isExist) throw new Error('이미 좋아요가 등록되어 있습니다.');
      return await Likes.updateOne(
        { articleId },
        { $push: { likes: { providerId, insertDate: new Date() } } },
        { new: true },
      ).exec();
    }
    if (!isExist) throw new Error('좋아요 등록되지 않은 게시글입니다.');
    return await Likes.updateOne(
      { articleId },
      { $pull: { likes: { providerId } } },
      { new: true },
    ).exec();
  }
}

export default new LikesRepository();

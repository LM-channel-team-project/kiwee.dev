import Likes from '../model/Likes';

class LikeRepository {
  likes = Likes;
  constructor() {}
  async createLikes(articleId: string) {
    return await this.likes.create({ articleId, likes: [] });
  }
}

export default new LikeRepository();

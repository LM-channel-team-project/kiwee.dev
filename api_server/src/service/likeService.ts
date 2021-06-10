import { throws } from 'node:assert';
import { LikesModel } from '../model/Likes';
import likesRepository from '../repository/LikeRepository';

class LikeService {
  private likesRepository = likesRepository;
  constructor() {}
  async findLikeByProviderId(providerId: string) {
    return await this.likesRepository.findLikesByProviderId(providerId);
  }

  async updateLike(providerId: string, articleId: string, isSave: boolean) {
    const likes = (await this.likesRepository.findLikesByProviderId(providerId)) as LikesModel;
    if (!likes) throw new Error('존재하지 않는 회원입니다.');

    const isExist = likes.isLiked(articleId);
    if (isSave) {
      if (isExist) throw new Error('이미 등록된 article입니다.');
      return this.likesRepository.insertLike(providerId, articleId);
    }
    if (!isExist) throw new Error('등록되지 않은 article입니다.');
    return this.likesRepository.removeLike(providerId, articleId);
  }
}
export default new LikeService();

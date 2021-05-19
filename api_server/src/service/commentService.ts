import commentRepository from '../repository/CommentRepository';

class CommentService {
  private commentRepository = commentRepository;
  constructor() {}
  async findCommentsByArticleId(articleId: string) {
    return await this.commentRepository.findCommentsByArticleId(articleId);
  }
}

export default new CommentService();

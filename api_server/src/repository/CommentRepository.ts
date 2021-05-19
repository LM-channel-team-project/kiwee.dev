import Comments from '../model/Comments';

class CommentRepository {
  private Comments = Comments;
  constructor() {}
  async findCommentsByArticleId(articleId: string) {
    return await this.Comments.findOne(
      { articleId },
      { _id: 0, articleId: 0 }
    ).exec();
  }
}

export default new CommentRepository();

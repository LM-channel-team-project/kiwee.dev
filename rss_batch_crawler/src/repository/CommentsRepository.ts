import Comments from '../model/Comments';
class CommentsRepository {
  private Comments = Comments;
  constructor() {}
  async createComments(articleId: string) {
    return await this.Comments.create({
      articleId,
      comments: [],
    });
  }
}

export default new CommentsRepository();

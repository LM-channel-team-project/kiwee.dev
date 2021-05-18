import articleRepository, {
  SaveArticleProps,
} from '../repository/ArticleRepository';
import commentsRepository from '../repository/CommentsRepository';
import likesRepository from '../repository/LikesRepository';
class ArticleService {
  articleRepository = articleRepository;
  commentsRepository = commentsRepository;
  likesRepository = likesRepository;
  constructor() {}
  async saveArticle(saveArticleProps: SaveArticleProps) {
    const createdArticle = await this.articleRepository.saveArticle(
      saveArticleProps
    );
    const createdComments = await this.commentsRepository.createComments(
      createdArticle.articleId
    );
    const createdLikes = await this.likesRepository.createLikes(
      createdArticle.articleId
    );
    console.log(
      `saveArticle - ${createdArticle.articleId} ${saveArticleProps.title}`
    );
    console.log('createdArticle', createdArticle);
    console.log('createdComments', createdComments);
    return createdArticle;
  }
}

export default new ArticleService();

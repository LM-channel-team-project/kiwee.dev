import { v4 as uuidV4 } from 'uuid';

import ArticleModel from '../model/Article';
export interface SaveArticleProps {
  providerId: string;
  title: string;
  insertDate: Date;
  thumbnail: string;
  name: string;
  avatar: string;
  articleUrl: string;
  keywords: string[];
}

const ArticleRepository = class {
  private Article;
  constructor(Article: typeof ArticleModel) {
    this.Article = Article;
  }
  async saveArticle({
    articleUrl,
    avatar,
    insertDate,
    keywords,
    name,
    providerId,
    thumbnail,
    title,
  }: SaveArticleProps) {
    const articleId = uuidV4();
    const numOfLikes = 0;
    const numOfComments = 0;
    return await this.Article.create({
      articleId,
      provider: {
        providerId,
        name,
        avatar,
      },
      title,
      articleUrl,
      keywords,
      thumbnail,
      numOfLikes,
      numOfComments,
      insertDate,
    });
  }
};

export default new ArticleRepository(ArticleModel);

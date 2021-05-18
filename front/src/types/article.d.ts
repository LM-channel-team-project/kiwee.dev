export interface IArticle {
  articleId: string;
  articleUrl: string;
  insertDate: string;
  keywords: string[];
  providerAvatar: string;
  providerId: string;
  provider: {
    [key: string]: string;
  };
  thumbnail: string;
  title: string;
  id: string;
}

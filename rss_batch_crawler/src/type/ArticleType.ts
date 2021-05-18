export default interface ArticleType {
  articleId: string;
  articleUrl: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  numOfLikes: number;
  numOfComments: number;
  title: string;
  thumbnail: string;
  insertDate: Date;
  keywords: string[];
}

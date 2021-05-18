export default interface ArticleType {
  articleId: string;
  provider: {
    providerId: string;
    name: string;
    avatar: string;
  };
  articleUrl: string;
  numOfLikes: number;
  numOfComments: number;
  title: string;
  thumbnail: string;
  insertDate: Date;
  keywords: string[];
}

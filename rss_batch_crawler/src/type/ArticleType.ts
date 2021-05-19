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
  lastModifiedTime: Date;
  keywords: string[];
}

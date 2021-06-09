export interface IArticle {
  articleId: string;
  articleUrl: string;
  isLiked: boolean;
  isBookmarked: boolean;
  isVisited: boolean;
  insertDate: string;
  keywords: string[];
  numOfComments: number;
  numOfLikes: number;
  provider: {
    [avatar: string]: string;
    [name: string]: string;
    [providerId: string]: string;
  };
  thumbnail: string;
  title: string;
  _id: string;
}

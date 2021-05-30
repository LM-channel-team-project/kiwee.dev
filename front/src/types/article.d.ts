export interface IArticle {
  articleId: string;
  articleUrl: string;
  isBookmarked: boolean;
  isVisited: boolean;
  insertDate: string;
  keywords: string[];
  likes: {
    [insertDate: string]: string;
    [providerId: string]: string;
    [_id: string]: string;
  }[];
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

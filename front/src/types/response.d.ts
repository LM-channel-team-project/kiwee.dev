import { IArticle } from './article';

export interface ProviderMeResponse {
  message: string;
  provider: {
    email: string;
    name: string;
    avatar: string;
    rssLink: string;
  };
}

export interface ArticlesResponse {
  data: IArticle[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  message: string;
  nextPage: number;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
}

type Bookmark = {
  articleId: string;
  insertedDate: Date;
};
export interface ProviderBookmarkResponse {
  message: string;
  bookmarks: Bookmark[];
}

export interface ProviderRssResponse {
  message: string;
}

export interface LikeListResponse {
  message: string;
  likes: string[]; // providerId[]
}

export interface LikeClickResponse {
  message: string;
}
export type Comment = {
  providerId: string;
  name: string;
  avatar: string;
  content: string;
  insertedDate: Date;
  lastUpdatedDate: Date;
};
export interface ArticleCommentsResponse {
  message: string;
  comments: Comment[];
}

export type History = {
  _id: string;
  articleId: string;
  insertDate: Date;
};

export interface HistoriesResponse {
  message: string;
  histories: History[];
}

export interface ArticleResponse {
  message: string;
  article: IArticle;
}

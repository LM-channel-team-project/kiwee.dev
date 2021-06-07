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

export type ProviderArticleInfo = {
  articleId: string;
  insertedDate: Date;
};

export type ProviderArticleInfos = {
  message: string;
  infos: ProviderArticleInfo[];
};

export interface ProviderRssResponse {
  message: string;
}

export interface LikesResponse {
  message: string;
  likes: ProviderArticleInfo[];
}

export interface BookmarksResponse {
  message: string;
  bookmarks: ProviderArticleInfo[];
}

export interface HistoriesResponse {
  message: string;
  histories: ProviderArticleInfo[];
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
export interface ArticleResponse {
  message: string;
  article: IArticle;
}

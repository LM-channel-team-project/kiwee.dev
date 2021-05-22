export interface ProviderMeResponse {
  message: string;
  provider: {
    email: string;
    name: string;
    avatar: string;
    rssLink: string;
  };
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

export default interface LikesType {
  providerId: string;
  likes: LikeType[];
}

export interface LikeDeprecatedType {
  articleId: string;
  likes: {
    providerId: string;
    insertDate: Date;
  }[];
}

export interface LikeType {
  articleId: string;
  insertedDate: Date;
}

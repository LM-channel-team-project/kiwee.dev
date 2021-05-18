export interface Comment {
  providerId: string;
  content: string;
  insertedDate: Date;
  lastUpdatedDate: Date;
}
export default interface CommentsType {
  articleId: string;
  comments: Comment[];
}


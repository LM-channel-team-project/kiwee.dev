export interface BookmarkType {
  articleId: string;
  insertedDate: Date;
}
export default interface BookmarksType {
  providerId: string;
  bookmarks: BookmarkType[];
}

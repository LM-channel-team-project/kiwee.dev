export default interface HistoryType {
  providerId: string;
  histories: {
    articleId: string;
    insertDate: string;
  }[];
}

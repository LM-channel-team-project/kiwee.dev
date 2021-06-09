export type History = {
  articleId: string;
  insertDate: string;
};

export default interface HistoryType {
  providerId: string;
  histories: History[];
}

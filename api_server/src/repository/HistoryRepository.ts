import History from '../model/History';
class HistoryRepository {
  private History = History;
  constructor() {}
  async createHistory(providerId: string) {
    const isExist = await this.History.exists({ providerId });
    if (isExist) return;
    return this.History.create({ providerId, history: [] });
  }
  pushHistory(providerId: string, articleId: string) {
    return this.History.findOneAndUpdate(
      { providerId },
      { $push: { histories: { articleId, insertedDate: new Date() } } },
      { new: true }
    ).exec();
  }
  findHistoryByProviderId(providerId: string) {
    return this.History.findOne({ providerId }).exec();
  }
}

export default new HistoryRepository();

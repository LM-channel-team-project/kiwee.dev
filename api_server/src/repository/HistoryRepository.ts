import History from '../model/History';

class HistoryRepository {
  private History = History;
  constructor() {}
  async createHistory(providerId: string) {
    const isExist = await this.History.exists({ providerId });
    if (isExist) return;
    return await this.History.create({ providerId, history: [] });
  }
  async insertHistory(providerId: string, articleId: string) {
    return await this.History.findOneAndUpdate(
      { providerId },
      { $push: { histories: { articleId, insertedDate: new Date() } } },
      { new: true },
    ).exec();
  }
  async removeHistory(providerId: string, articleId: string) {
    return await this.History.updateOne(
      { providerId },
      { $pull: { histories: { articleId } } },
      { new: true },
    ).exec();
  }
  async removeAllById(providerId: string) {
    return await this.History.findOneAndUpdate(
      { providerId },
      { histories: [] },
      { new: true },
    ).exec();
  }
  async findHistoryByProviderId(providerId: string) {
    return await this.History.findOne({ providerId }).exec();
  }
}

export default new HistoryRepository();

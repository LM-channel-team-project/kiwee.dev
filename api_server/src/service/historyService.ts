import { throws } from 'node:assert';
import { HistoryModel } from '../model/History';
import HistoryRepository from '../repository/HistoryRepository';

class HistorykService {
  private historyRepository = HistoryRepository;
  constructor() {}
  async findHistoryByProviderId(providerId: string) {
    return await this.historyRepository.findHistoryByProviderId(providerId);
  }

  async updateHistory(providerId: string, articleId: string, isSave: boolean) {
    const histories = (await this.historyRepository.findHistoryByProviderId(
      providerId,
    )) as HistoryModel;
    if (!histories) throw new Error('존재하지 않는 회원입니다.');

    const isExist = histories.isVisited(articleId);
    if (isSave) {
      if (isExist) throw new Error('이미 등록된 article입니다.');
      return await this.historyRepository.insertHistory(providerId, articleId);
    }
    if (!isExist) throw new Error('등록되지 않은 article입니다.');
    return await this.historyRepository.removeHistory(providerId, articleId);
  }

  async removeAllHistory(providerId: string) {
    return await HistoryRepository.removeAllById(providerId);
  }
}

export default new HistorykService();

import historyRepository from '../repository/HistoryRepository';
import articleRepository from '../repository/ArticleRepository';

class HistoryService {
  private historyRepository = historyRepository;
  private articleRepository = articleRepository;
  constructor() {}
  findHistoryByProviderId(providerId: string) {
    return this.historyRepository.findHistoryByProviderId(providerId);
  }
  async pushHistory(providerId: string, articleId: string) {
    const isArticleExist = await this.articleRepository.isExist(articleId);
    if (!isArticleExist) throw new Error('존재하지 않는 article입니다,');

    return await this.historyRepository.pushHistory(providerId, articleId);
  }
}

export default new HistoryService();

import express from 'express';
import rssProviderRepository from '../repository/RssProviderRepository';

const router = express.Router();

router.post(
  '/',
  async (request: express.Request, response: express.Response) => {
    console.log(request.body);
    const {
      providerEmail,
      providerType,
      providerName,
      providerAvatar,
      rssLink,
    } = request.body;
    if (!providerEmail || !providerType || !providerName || !rssLink) {
      response.status(400).json({
        message: '데이터가 올바르지 않습니다.',
      });
    }
    
    const { code, message } = await rssProviderRepository.saveRssProvider({
      providerAvatar,
      providerEmail,
      providerName,
      providerType,
      rssLink,
    });
    return response.status(code).json({ message });
  }
);

export default router;
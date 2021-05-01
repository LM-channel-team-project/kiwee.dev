import express from 'express';
import RssFeedRepository from '../repository/ArticleRepository';

const router = express.Router();

router.get(
  '/',
  async (request: express.Request, response: express.Response) => {
    const page = request.query.page;
    if (!page)
      return response.status(400).json({
        message: 'page를 전달해주세요.',
      });

    try {
      const { code, payload } = await RssFeedRepository.pagenateFeed(
        parseInt(page as string)
      );
      return response.status(code).json({ payload });
    } catch (e) {
      console.log(e);
      return response.status(503).json({ message: '에러가 발생했습니다.' });
    }
  }
);

export default router;

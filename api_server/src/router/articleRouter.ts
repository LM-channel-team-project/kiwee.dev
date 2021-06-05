import express, { Request, Response } from 'express';
import { CommentsModel } from '../model/Comments';

import articleService from '../service/articleService.new';
import commentService from '../service/commentService';

const router = express.Router();

type Filter = 'like' | 'history' | 'bookmark';

// articleId가 query string에 존재하면 특정 아티클 정보만 가져옴, page 무시됨.
// articleId가 없는 경우 페이징 결과를 반환.
router.get('/', async (req: Request, res: Response) => {
  const { articleId, page, providerId, filter } = req.query as {
    articleId: string;
    page: string;
    providerId: string;
    filter: Filter;
  };

  // 필터에 따라 아티클 조회
  if (filter && providerId) {
    try {
      if (!page) return res.status(400).json({ message: 'page가 필요합니다' });
      const getArticles = {
        like: () => articleService.findAllByLike(parseInt(page, 10), providerId),
        history: () => articleService.findAllByHistory(parseInt(page, 10), providerId),
        bookmark: () => articleService.findAllByBookmark(parseInt(page, 10), providerId),
      };
      const { docs, ...extra } = await getArticles[filter]();
      return res.status(200).json({ data: docs, ...extra });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: '아티클 요청 서버 에러', error: e });
    }
  }

  if (articleId) {
    try {
      const article = await articleService.findOneById(articleId, providerId);
      if (!article) return res.status(404).json({ message: '존재하지 않는 article입니다.' });
      return res.status(200).json({ message: '정상적으로 처리되었습니다.', article });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: '서버 에러' });
    }
  }

  if (!page) return res.status(400).json({ message: 'page가 필요합니다' });
  try {
    const { docs, ...extra } = await articleService.findAllByPage(parseInt(page), providerId);
    return res.status(200).json({ message: '정상적으로 처리되었습니다.', data: docs, ...extra });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: '에러가 발생했습니다.' });
  }
});

router.get('/comments', async (req: Request, res: Response) => {
  const articleId = req.query.articleId as string;
  if (!articleId) return res.status(400).json({ message: 'articleId가 필요합니다.' });

  try {
    const { comments } = (await commentService.findCommentsByArticleId(articleId)) as CommentsModel;
    // console.log(comments);
    if (!comments) return res.status(404).json({ message: '존재하지 않는 article입니다.' });
    return res.status(200).json({ message: '정상적으로 처리되었습니다.', comments });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: '에러가 발생했습니다.' });
  }
});

export default router;

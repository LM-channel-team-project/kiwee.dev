import { Router, Request, Response } from 'express';
import historyService from '../service/historyService';
import HistoryType from '../type/HistoryType';

const router = Router();

// 방문한 게시물 목록 조회
router.get('/', async (req: Request, res: Response) => {
  const providerId = req.query.providerId as string;
  if (!providerId)
    return res.status(401).json({ message: 'providerId가 필요합니다.' });

  try {
    const { historys } = (await historyService.findHistoryByProviderId(
      providerId
    )) as HistoryType;

    if (!historys)
      return res.status(404).json({ message: '존재하지 않는 회원입니다.' });
    return res
      .status(200)
      .json({ message: '정상적으로 처리되었습니다.', historys });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// 방문한 게시물 등록
router.patch('/', async (req: Request, res: Response) => {
  const providerId = req.query.providerId as string;
  const articleId = req.query.articleId as string;
  if (!providerId || !articleId)
    return res
      .status(401)
      .json({ message: 'providerId, articleId가 필요합니다.' });

  try {
    const { historys } = (await historyService.pushHistory(
      providerId,
      articleId
    )) as HistoryType;

    if (!historys)
      return res.status(404).json({ message: '존재하지 않는 회원입니다.' });
    return res
      .status(200)
      .json({ message: '정상적으로 처리되었습니다.', historys });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

export default router;
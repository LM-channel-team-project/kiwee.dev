import { Router, Request, Response } from 'express';
import historyService from '../service/historyService';
import HistoryType from '../type/HistoryType';

const router = Router();

// 방문한 게시물 목록 조회
router.get('/', async (req: Request, res: Response) => {
  const providerId = req.query.providerId as string;
  if (!providerId) return res.status(401).json({ message: 'providerId가 필요합니다.' });

  try {
    const { histories } = (await historyService.findHistoryByProviderId(providerId)) as HistoryType;

    if (!histories) return res.status(404).json({ message: '존재하지 않는 회원입니다.' });
    return res.status(200).json({ message: '정상적으로 처리되었습니다.', histories });
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
    return res.status(401).json({ message: 'providerId, articleId가 필요합니다.' });

  try {
    const updateResult = await historyService.updateHistory(providerId, articleId, true);
    if (!updateResult) {
      return res.status(200).json({ message: '이미 등록 된 아티클입니다.' });
    }
    return res.status(200).json({ message: '정상적으로 처리되었습니다.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// 히스토리 목록 삭제
router.delete('/', async (req, res) => {
  const providerId = req.query.providerId as string;
  if (!providerId) return res.status(401).json({ message: 'providerId가 필요합니다.' });
  try {
    const result = await historyService.removeAllHistory(providerId);
    if (!result) throw new Error('히스토리 목록 삭제 실패');
    return res.status(200).json({ message: '정상적으로 처리되었습니다.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

export default router;

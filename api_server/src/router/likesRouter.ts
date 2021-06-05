import { Request, Response, Router } from 'express';

import likeService from '../service/likeService';
import articleService from '../service/articleService.new';
import LikeType from '../type/LikeType';

const router = Router();

// 특정 provider의 좋아요 조회
router.get('/', async (req: Request, res: Response) => {
  const providerId = req.query.providerId as string;
  if (!providerId) return res.status(401).json({ message: 'providerId가 필요합니다.' });
  try {
    const { likes } = (await likeService.findLikeByProviderId(providerId)) as LikeType;
    if (!likes) return res.status(404).json({ message: '존재하지 않는 회원입니다.' });
    return res.status(200).json({ message: '정상적으로 처리되었습니다.', likes });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

// like 등록, 취소
// isSave가 true인 경우 등록
// isSave가 false인 경우 취소
router.post('/', async (req: Request, res: Response) => {
  const { articleId, providerId, isSave } = req.body;
  if (!articleId || !providerId || isSave === undefined)
    return res.status(401).json({ message: 'articleId, providerId, isSave가 필요합니다.' });
  try {
    const updateLikeResult = await articleService.updateOneByLike(providerId, articleId, isSave);
    if (!updateLikeResult) throw new Error('아티클 라이크 업데이트 실패');
    return res.status(201).json({ message: '정상적으로 처리되었습니다' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

export default router;

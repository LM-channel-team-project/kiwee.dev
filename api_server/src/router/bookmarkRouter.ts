import { Request, Response, Router } from 'express';

import bookmarkService from '../service/bookmarkService';
import BookmarksType from '../type/BookmarksType';

const router = Router();

// 특정 provider의 북마크 조회
router.get('/', async (req: Request, res: Response) => {
  const providerId = req.query.providerId as string;
  if (!providerId) return res.status(401).json({ message: 'providerId가 필요합니다.' });

  try {
    const { bookmarks } = (await bookmarkService.findBookmarkByProviderId(
      providerId,
    )) as BookmarksType;
    console.log(bookmarks);
    if (!bookmarks) return res.status(404).json({ message: '존재하지 않는 회원입니다.' });
    return res.status(200).json({ message: '정상적으로 처리되었습니다.', bookmarks });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// bookmark 등록, 취소
// isSave가 true인 경우 등록
// isSave가 false인 경우 취소
router.post('/', async (req: Request, res: Response) => {
  const { articleId, providerId, isSave } = req.body;
  if (!articleId || !providerId || typeof isSave !== 'boolean')
    return res.status(401).json({ message: 'articleId, providerId, isSave가 필요합니다.' });

  try {
    const updateResult = await bookmarkService.updateBookmark(providerId, articleId, isSave);
    if (!updateResult.ok) throw new Error('아티클 업데이트 실패');
    return res.status(201).json({ message: '정상적으로 처리되었습니다' });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
});

export default router;

import { Request, Response, Router } from 'express';

import { LikeModel } from '../model/Likes.deprecated';
import articleService from '../service/articleService';

const router = Router();

// 특정 아티클의 Like를 누른 회원 조회
router.get('/', async (req: Request, res: Response) => {
  const articleId = req.query.articleId;
  if (!articleId) return res.status(401).json({ message: 'must send articleId' });

  try {
    const { likes } = (await articleService.findLikesByArticleId(articleId as string)) as LikeModel;
    // console.log(likes);
    return res.status(200).json({ message: '정상적으로 처리되었습니다.', likes });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: '서버 에러' });
  }
});

// like 버튼을 누른 경우 article의 numsOfLikes 증가 및 likes 배열에 추가
router.post('/', async (req: Request, res: Response) => {
  const { articleId, providerId, isLike } = req.body;
  if (!articleId || !providerId || isLike === undefined)
    return res.status(401).json({ message: 'articleId, providerId, isLike가 필요합니다.' });

  try {
    const [updatedLikes, updatedArticle, updateProvider] = await articleService.saveLike(
      articleId,
      providerId,
      isLike,
    );
    // console.log("updatedLikes", updatedLikes);
    // console.log("updatedArticle", updatedArticle);
    // console.log("updateProvider", updateProvider);
    return res.status(201).json({ message: '정상적으로 처리되었습니다.' });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: e.message });
  }
});
export default router;

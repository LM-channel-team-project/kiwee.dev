import express from 'express';
import dotenv from 'dotenv';

import LikeDiscardModel from '../model/Likes.deprecated';
import ProviderModel from '../model/Provider';
import LikesModel from '../model/Likes';
import HistoryModel from '../model/History';
import BookmarksModel from '../model/Bookmarks';
import articleService from '../service/articleService.new';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.env',
});

const router = express.Router();

/**
 * ================================================================================================================
 * 테스트용 라우터입니다. 테스트 후 삭제 예정
 * ================================================================================================================
 */

// 전체 아티클 조회
router.get('/articles', async (req, res) => {
  try {
    const { page, providerId } = req.query as { page: string; providerId: string };
    const { docs, ...extra } = await articleService.findAllByPage(parseInt(page, 10), providerId);
    return res.status(200).json({ data: docs, ...extra });
  } catch (e) {
    return res.status(500).json({ message: 'test/likes error', error: e });
  }
});

// 개별 아티클 조회
router.get('/article', async (req, res) => {
  try {
    const result = await articleService.findOneById(
      'a27105d8-f58d-4de8-b3f5-508aad131a5d',
      '105391647150557262909',
    );
    return res.status(200).json({ data: result });
  } catch (error) {}
});
// 전체 북마크 조회
router.get('/bookmarks', async (req, res) => {
  try {
    const result = await BookmarksModel.find();
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ message: 'test/likes error', error: e });
  }
});
// a27105d8-f58d-4de8-b3f5-508aad131a5d 전체 히스토리 조회
router.get('/history', async (req, res) => {
  const result = await HistoryModel.findOne({ providerId: '105391647150557262909' });
  return res.status(200).json({ data: result });
});

// 전체 좋아요 조회
router.get('/likes', async (req, res) => {
  try {
    const result = await LikeDiscardModel.find();
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ message: 'test/likes error', error: e });
  }
});

// 전체 좋아요v2 조회
router.get('/likes2', async (req, res) => {
  try {
    const result = await LikesModel.find({ likes: { $exists: true, $not: { $size: 0 } } });
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ message: 'test/likes error', error: e });
  }
});

// 좋아요 -> 좋야요v2 동기화
router.patch('/likes2', async (req, res) => {
  try {
    const likesV1 = await LikeDiscardModel.find({ likes: { $exists: true, $not: { $size: 0 } } });
    const refined = likesV1.reduce<{ [index: string]: string[] }>((acc, cur) => {
      cur.likes.forEach((item) => {
        Array.isArray(acc[item.providerId])
          ? acc[item.providerId].push(cur.articleId)
          : (acc[item.providerId] = [cur.articleId]);
      });
      return acc;
    }, {});

    for (const providerId in refined) {
      await LikesModel.updateOne({ providerId }, { likes: [] });
      await LikesModel.updateOne(
        { providerId },
        {
          $push: {
            likes: {
              $each: refined[providerId].map((item) => ({
                articleId: item,
                insertedDate: new Date(),
              })),
            },
          },
        },
      );
    }
    const result = await LikesModel.find();
    return res.status(200).json({ data: result });
  } catch (e) {
    return res.status(500).json({ message: 'test/likes error', error: e });
  }
});

// 유저 좋아요v2 필드 생성
router.post('/likes2', async (req, res) => {
  const providers = await ProviderModel.find();
  const providerIds = providers.map((provider) => provider.providerId);

  const promises = providerIds.map((id) => {
    return LikesModel.create({
      providerId: id,
      likes: [],
    });
  });

  const result = await Promise.all(promises);
  return res.status(200).json({ data: result });
});

export default router;

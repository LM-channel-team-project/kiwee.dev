import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

import providerService from '../service/providerService';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.env',
});

const router = express.Router();
const RESET_KEY = process.env.RESET_KEY;
const RSS_CRAWLER_URL = process.env.RSS_CRAWLER_URL;

router.post('/', async (req: Request, res: Response) => {
  const { providerId, email, name, avatar } = req.body;
  if (!providerId || !email || !name) {
    return res.status(406).json({
      message: '데이터가 올바르지 않습니다.',
    });
  }
  try {
    const result = await providerService.saveProvider({
      providerId,
      avatar,
      email,
      name,
    });
    return res.status(201).json({ message: '정상적으로 처리되었습니다.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: '서버 오류.' });
  }
});

// 개인정보 요청
router.get('/me', async (req: Request, res: Response) => {
  const providerId = req.query.providerId as string;
  if (!providerId) res.status(406).json({ message: 'providerId가 필요합니다' });

  try {
    const result = await providerService.findOneByProviderId(providerId);
    if (!result) return res.status(404).json({ message: '존재하지 않는 회원입니다.' });

    return res.status(200).json({ message: '정상적으로 처리되었습니다.', provider: result });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류.' });
  }
});

// 블로그 목록 요청
router.get('/blogs', async (req, res) => {
  try {
    const result = await providerService.findAllBlogProviders();
    return res
      .status(200)
      .json({
        message: '정상적으로 처리되었습니다.',
        blogs: result || [],
        count: result.length || 0,
      });
  } catch (error) {
    return res.status(500).json({ message: '서버 오류.' });
  }
});

router.post('/rss', async (req: Request, res: Response) => {
  const { providerId, rssUrl } = req.body;
  if (!providerId || !rssUrl)
    return res.status(401).json({ message: 'providerId, RssUrl이 필요합니다.' });

  try {
    const result = await providerService.saveRssUrl(providerId, rssUrl);

    // RSS crawling 요청
    axios
      .get(`${RSS_CRAWLER_URL}?providerId=${providerId}&rssUrl=${rssUrl}`)
      .then((res) => console.log(res.data));

    return res.status(200).json({ message: '성공적으로 등록되었습니다.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

// 호출 금지
router.post('/reset', async (req: Request, res: Response) => {
  const _RESET_KEY = req.headers.reset_key;
  if (!_RESET_KEY || RESET_KEY !== _RESET_KEY)
    return res.status(403).json({ message: 'not authorized' });

  try {
    const result = await providerService.resetLastModifiedTime();
    return res.status(200).json({ message: 'LastModifiedTime이 리셋되었습니다.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: '에러가 발생했습니다.' });
  }
});

export default router;

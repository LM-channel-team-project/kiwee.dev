import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

import providerService from '../service/providerService';
import axios from 'axios';
import bookmarkService from '../service/bookmarkService';
import { BookmarksModel } from '../model/Bookmarks';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.env',
});

const router = express.Router();
const RESET_KEY = process.env.RESET_KEY;
const RSS_CRAWLER_URL = process.env.RSS_CRAWLER_URL;
/**
 * @swagger
 *  components:
 *    schemas:
 *      SignInRequest:
 *        type: object
 *        required:
 *          - providerEmail
 *          - providerName
 *        properties:
 *          providerEmail:
 *            type: string
 *            format: email
 *            description: OAuth2.0 로그인 사용자 이메일
 *          providerName:
 *            type: string
 *            description: OAuth2.0 로그인 사용자 이름
 *          providerAvatar:
 *            type: string
 *            format: url
 *            description: OAuth2.0 로그인 사용자 아바타
 *      SignInResponse:
 *        type: object
 *        properties:
 *          message:
 *            type: string
 *          data:
 *            type: object
 *            properties:
 *              providerId:
 *                type: string
 *                description: OAuth2.0 로그인 사용자 고유 키
 *              providerEmail:
 *                type: string
 *                format: email
 *                description: OAuth2.0 로그인 사용자 이메일
 *              providerName:
 *                type: string
 *                description: OAuth2.0 로그인 사용자 이름
 *              providerAvatar:
 *                type: string
 *                format: url
 *                description: OAuth2.0 로그인 사용자 아바타
 *              rssLink:
 *                type: string
 *                format: url
 *                description: 사용자가 등록한 RSS Link
 *              lastModifiedTime:
 *                type: string
 *                format: date
 *                description: 사용자의 마지막 포스트가 등록된 시간
 *              accessToken:
 *                type: string
 *                description: 사용자 인증 AccessToken
 */

/**
 * @swagger
 * /provider:
 *  post:
 *    summary: Client에서 Oauth 로그인시 회원 정보를 저장.
 *    tags:
 *      - provider
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: login
 *        schema:
 *          $ref: '#/components/schemas/SignInRequest'
 *    responses:
 *      201:
 *        description: 정상 처리
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/components/schemas/SignInResponse'
 *      406:
 *        description: 데이터가 올바르지 않음
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/ResponseMessage'
 *
 *      500:
 *        description: 서버 에러 발생
 *        content:
 *          application/json:
 *           schema:
 *            $ref: '#/ResponseMessage'
 */
router.post('/', async (req: Request, res: Response) => {
  console.log(req.body);
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
    console.log(result);
    return res.status(201).json({ message: '정상적으로 처리되었습니다.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: '서버 오류.' });
  }
});

router.get('/me', async (req: Request, res: Response) => {
  const providerId = req.query.providerId as string;
  if (!providerId) res.status(406).json({ message: 'providerId가 필요합니다' });

  try {
    const result = await providerService.findProviderById(providerId);
    console.log(result);
    if (!result)
      return res.status(404).json({ message: '존재하지 않는 회원입니다.' });

    return res
      .status(200)
      .json({ message: '정상적으로 처리되었습니다.', provider: result });
  } catch (e) {
    return res.status(500).json({ message: '서버 오류.' });
  }
});
router.post('/rss', async (req: Request, res: Response) => {
  const { providerId, rssUrl } = req.body;
  if (!providerId || !rssUrl)
    return res
      .status(401)
      .json({ message: 'providerId, RssUrl이 필요합니다.' });

  try {
    const result = await providerService.saveRssUrl(providerId, rssUrl);
    console.log(result);

    // RSS crawling 요청
    axios
      .get(`${RSS_CRAWLER_URL}?providerId=${providerId}&rssUrl=${rssUrl}`)
      .then(res => console.log(res.data));

    return res.status(200).json({ message: '성공적으로 등록되었습니다.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});
router.get('/bookmark', async (req: Request, res: Response) => {
  const providerId = req.query.providerId as string;
  if (!providerId)
    return res.status(401).json({ message: 'providerId가 필요합니다.' });

  try {
    const { bookmarks } = (await bookmarkService.findBookmarkByProviderId(
      providerId
    )) as BookmarksModel;
    console.log(bookmarks);
    if (!bookmarks)
      return res.status(404).json({ message: '존재하지 않는 회원입니다.' });
    return res
      .status(200)
      .json({ message: '정상적으로 처리되었습니다.', bookmarks });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});
router.post('/reset', async (req: Request, res: Response) => {
  const _RESET_KEY = req.headers.reset_key;
  if (!_RESET_KEY || RESET_KEY !== _RESET_KEY)
    return res.status(403).json({ message: 'not authorized' });

  try {
    const result = await providerService.resetLastModifiedTime();
    console.log(result);
    return res
      .status(200)
      .json({ message: 'LastModifiedTime이 리셋되었습니다.' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: '에러가 발생했습니다.' });
  }
});
export default router;

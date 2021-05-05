import express from 'express';
import jwt from '../secure/jwt';
import rssProviderRepository from '../repository/RssProviderRepository';

const router = express.Router();

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
 *    summary: OAuth2.0 로그인시 회원 정보 동기화 및 인증 토큰 발급
 *    tags:
 *      - provider
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: login
 *        description: OAuth2.0 로그인시 사용되는 이메일과 부가 정보들을 저장하고 엑세스토큰 발급
 *        schema:
 *          $ref: '#/components/schemas/SignInRequest'
 *    responses:
 *      201:
 *        description: 정상 로그인 처리
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
router.post(
  '/',
  async (request: express.Request, response: express.Response) => {
    console.log(request.body);
    const { providerEmail, providerName, providerAvatar } = request.body;
    if (!providerEmail || !providerName) {
      return response.status(406).json({
        message: '데이터가 올바르지 않습니다.',
      });
    }
    const { code, message, data } = await rssProviderRepository.saveRssProvider(
      {
        providerAvatar,
        providerEmail,
        providerName,
      }
    );
    if (code === 201) {
      const accessToken = jwt.sign(providerEmail);
      return response
        .status(code)
        .json({ message, data: { ...data, accessToken } });
    }
    return response.status(code).json({ message, data });
  }
);

export default router;

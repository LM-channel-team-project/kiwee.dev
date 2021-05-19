import express, { Request, Response } from 'express';
import { CommentsModel } from '../model/Comments';

import articleService from '../service/articleService';
import commentService from '../service/commentService';

const router = express.Router();
/**
 * @swagger
 *  components:
 *    schemas:
 *      Article:
 *        type: object
 *        properties:
 *          articleId:
 *            type: string
 *          articleUrl:
 *            type: string
 *          providerId:
 *            type: string
 *          providerName:
 *            type: string
 *          providerAvatar:
 *            type: string
 *          title:
 *            type: string
 *          thumbnail:
 *            type: string
 *          insertDate:
 *            type: string
 *            format: date
 *          keywords:
 *            type: array
 *            items:
 *              type: string
 */

/**
 * @swagger
 * /article:
 *  get:
 *    summary: RSS 아티클 최신순 페이지 요청
 *    tags:
 *      - article
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: page
 *        description: page 번호
 *        schema:
 *          type: number
 *        required: true
 *    responses:
 *      200:
 *        description: 아티클 정상 반환
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Article'
 *                totalDocs:
 *                  type: number
 *                limit:
 *                  type: number
 *                totalPages:
 *                  type: number
 *                page:
 *                  type: number
 *                pagingCounter:
 *                  type: number
 *                hasPrevPage:
 *                  type: boolean
 *                hasNextPage:
 *                  type: boolean
 *                prevPage:
 *                  type: number
 *                  nullable: true
 *                nextPage:
 *                  type: number
 *                  nullable: true
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
router.get('/', async (req: Request, res: Response) => {
  const page = req.query.page;
  if (!page)
    return res.status(400).json({
      message: 'page가 필요합니다',
    });
  try {
    const { docs, ...extra } = await articleService.findArticlesByPage(
      parseInt(page as string)
    );
    return res
      .status(200)
      .json({ message: '정상적으로 처리되었습니다.', data: docs, ...extra });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: '에러가 발생했습니다.' });
  }
});
router.get('/comments', async (req: Request, res: Response) => {
  const articleId = req.query.articleId as string;
  if (!articleId)
    return res.status(400).json({ message: 'articleId가 필요합니다.' });

  try {
    const { comments } = (await commentService.findCommentsByArticleId(
      articleId
    )) as CommentsModel;
    console.log(comments);
    if (!comments)
      return res.status(404).json({ message: '존재하지 않는 article입니다.' });
    return res
      .status(200)
      .json({ message: '정상적으로 처리되었습니다.', comments });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: '에러가 발생했습니다.' });
  }
});
export default router;

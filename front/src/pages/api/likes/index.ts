import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';
import { JWT } from 'next-auth/jwt';

import withCheckJwt from '@/wrapper/withCheckJwt';
import { LikesResponse } from '@/types/response';
import { API_SERVER_URL } from '@/config/constants';

/**
 * 특정 사용자의 좋아요 목록 조회
 * GET /bookmark
 */

/**
 * 특정 게시물에 대해 좋아요 활성화/비활성화
 * POST /likes
 * body {
 *  articleId: string,
 *  isSave: boolean // bookmark 등록시 true, 취소시 false
 * }
 **/

export default withCheckJwt(async (req: NextApiRequest, res: NextApiResponse, token: JWT) => {
  try {
    const { sub: providerId } = token;
    if (!providerId) return res.status(400).json({ message: 'not valid' });

    // 프로바이더 좋아요 목록 요청
    if (req.method === 'GET') {
      const requestUrl = `${API_SERVER_URL}/likes?providerId=${providerId}`;
      const { data, status } = await axios.get<LikesResponse>(requestUrl);
      return res.status(status).json({ infos: data.likes });
    }
    // 프로바이더 좋아요 업데이트 요청
    if (req.method === 'POST') {
      const { articleId, isSave } = req.body;
      if (!articleId || typeof isSave !== 'boolean') {
        return res.status(401).json({ message: 'articleId, providerId, isSave가 필요합니다.' });
      }
      const requestUrl = `${API_SERVER_URL}/likes`;
      const { data, status } = await axios.post(requestUrl, { articleId, providerId, isSave });
      return res.status(status).json(data);
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }

  return res.status(405).end();
});

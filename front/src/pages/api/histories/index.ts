import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';
import { JWT } from 'next-auth/jwt';

import withCheckJwt from '@/wrapper/withCheckJwt';
import { HistoriesResponse } from '@/types/response';
import { API_SERVER_URL } from '@/config/constants';

/**
 * 특정 사용자의 history 목록 조회
 * GET /history
 */

/**
 * 특정 게시물에 대해 history 추가
 * PATCH /history?articleId={articleId}
 *  */

export default withCheckJwt(async (req: NextApiRequest, res: NextApiResponse, token: JWT) => {
  try {
    const { sub: providerId } = token;
    if (!providerId) return res.status(400).json({ message: 'not valid' });

    // 프로바이더 히스토리 목록 요청
    if (req.method === 'GET') {
      const requestUrl = `${API_SERVER_URL}/history?providerId=${providerId}`;
      const { data, status } = await axios.get<HistoriesResponse>(requestUrl);
      return res.status(status).json({ infos: data.histories });
    }
    // 프로바이더 히스토리 목록 추가 요청
    if (req.method === 'PATCH') {
      const articleId = req.query.articleId as string;
      if (!articleId) return res.status(401).json({ message: 'articleId가 필요합니다.' });
      const requestUrl = `${API_SERVER_URL}/history?providerId=${providerId}&articleId=${articleId}`;
      const { data, status } = await axios.patch(requestUrl);
      return res.status(status).json(data);
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }

  return res.status(405).end();
});

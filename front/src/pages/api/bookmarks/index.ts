import { API_SERVER_URL } from '@/config/constants';
import withCheckJwt from '@/wrapper/withCheckJwt';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';
import { JWT } from 'next-auth/jwt';

/**
 * 특정 article에 좋아요를 누른 사용자 목록 요청
 * GET /bookmark
 */

/**
 * 특정 게시물에 대해 좋아요 활성화/비활성화
 * POST /bookmarks
 * body {
 *  articleId: string,
 *  isLike: boolean // 좋아요 누를 경우 true, 취소할 경우 false
 * }
 *  */
export default withCheckJwt(async (req: NextApiRequest, res: NextApiResponse, token: JWT) => {
  if (req.method === 'GET') {
    const { sub: providerId } = token;
    if (!providerId) return res.status(400).json({ message: 'not valid' });

    try {
      const requestUrl = `${API_SERVER_URL}/bookmarks?providerId=${providerId}`;
      const { data, status } = await axios.get(requestUrl);
      console.log(data);
      return res.status(status).json(data);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  } else if (req.method === 'POST') {
    const { articleId, isSave } = req.body;
    const { sub: providerId } = token;
    if (!articleId || !providerId || isSave === undefined)
      return res.status(401).json({ message: 'articleId, providerId, isSave가 필요합니다.' });

    try {
      const requestUrl = `${API_SERVER_URL}/bookmarks`;
      const { data, status } = await axios.post(requestUrl, {
        articleId,
        providerId,
        isSave,
      });
      console.log(data);
      return res.status(status).json(data);
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: e.message });
    }
  }
});

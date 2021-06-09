import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

import { API_SERVER_URL } from '@/config/constants';

/**
 * 특정 article의 댓글 목록을 요청
 * GET /article/comments?articleId={articleId}
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'GET') {
      const { articleId } = req.query as { articleId: string };
      if (!articleId) return res.status(400).json({ message: 'not valid' });

      const requestUrl = `${API_SERVER_URL}/articles/comments?articleId=${articleId}`;
      const { data, status } = await axios.get(requestUrl);
      return res.status(status).json(data);
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
  return res.status(405).end();
};

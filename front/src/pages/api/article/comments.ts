import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

import { API_SERVER_URL } from '@/config/constants';

/**
 * 특정 article의 댓글 목록을 요청
 * GET /article/comments?articleId={articleId}
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const articleId = req.query.articleId as string;
  if (req.method !== 'GET' || !articleId) return res.status(400).json({ message: 'not valid' });
  try {
    const requestUrl = `${API_SERVER_URL}/article/comments?articleId=${articleId}`;
    const { data, status } = await axios.get(requestUrl);
    console.log(data);
    return res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

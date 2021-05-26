import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

import { API_SERVER_URL } from '@/config/constants';

/**
 * article page 요청
 * GET /article?page={page}
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const articleId = req.query.articleId as string;
  const page = req.query.page as string;
  if (req.method !== 'GET' || (page === undefined && articleId === undefined))
    return res.status(400).json({ message: 'not valid' });
  try {
    const requestUrl = articleId
      ? `${API_SERVER_URL}/article?articleId=${articleId}`
      : `${API_SERVER_URL}/article?page=${page}`;
    const { data, status } = await axios.get(requestUrl);
    console.log(data);
    return res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

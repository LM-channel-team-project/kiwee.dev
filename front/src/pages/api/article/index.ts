import axios from 'axios';
import { getToken, JWT } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

import { API_SERVER_URL, JWT_SECRET } from '@/config/constants';

/**
 * article page 요청
 * GET /article?page={page}
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret: JWT_SECRET });
  const providerId = token !== null && token.sub;
  const articleId = req.query.articleId as string;
  const page = req.query.page as string;
  if (req.method !== 'GET' || (page === undefined && articleId === undefined))
    return res.status(400).json({ message: 'not valid' });
  try {
    let requestUrl = articleId
      ? `${API_SERVER_URL}/article?articleId=${articleId}`
      : `${API_SERVER_URL}/article?page=${page}`;
    if (providerId) requestUrl += `&providerId=${providerId}`;
    const { data, status } = await axios.get(requestUrl);
    console.log(data);
    return res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

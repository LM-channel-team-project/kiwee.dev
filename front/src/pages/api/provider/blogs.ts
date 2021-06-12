import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

import { API_SERVER_URL } from '@/config/constants';

/**
 * 블로그 목록 요청
 * GET /provider/blogs
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == 'GET') {
      const url = `${API_SERVER_URL}/provider/blogs`;
      const { data, status } = await axios.get(url);
      return res.status(status).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  return res.status(405).end();
};

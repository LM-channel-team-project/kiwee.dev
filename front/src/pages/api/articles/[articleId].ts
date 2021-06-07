import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

import { API_SERVER_URL, JWT_SECRET } from '@/config/constants';

/**
 * article 조회
 * GET /article/articleId
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == 'GET') {
      const { articleId } = req.query as { articleId: string };
      const providerId = await getToken({ req, secret: JWT_SECRET }).then((token) => token?.sub);
      const url = `${API_SERVER_URL}/articles/${articleId}?providerId=${providerId}`;
      const { data, status } = await axios.get(url);

      return res.status(status).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  return res.status(405).end();
};

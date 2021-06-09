import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

import { API_SERVER_URL, JWT_SECRET } from '@/config/constants';
import { FilterType } from '@/types/apiType';

/**
 * article page 요청
 * GET /article?page={page}&filter?page={}
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == 'GET') {
      const { page = 1, filter = '' } = req.query as { page: string; filter?: FilterType };
      const providerId =
        (await getToken({ req, secret: JWT_SECRET }).then((token) => token?.sub)) || '';
      const url = `${API_SERVER_URL}/articles?page=${page}&filter=${filter}&providerId=${providerId}`;
      const { data, status } = await axios.get(url);
      return res.status(status).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  return res.status(405).end();
};

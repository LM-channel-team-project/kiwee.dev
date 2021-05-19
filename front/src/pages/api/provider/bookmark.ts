import axios from 'axios';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

import withCheckJwt from '@/wrapper/withCheckJwt';

import { API_SERVER_URL } from '@/config/constants';

/**
 * bookmark 요청
 * GET /provider/bookmark
 */
export default withCheckJwt(async (req: NextApiRequest, res: NextApiResponse, token: jwt.JWT) => {
  const { sub: providerId } = token;
  if (req.method !== 'GET') res.status(404).json({ message: 'not valid' });
  if (!providerId) return res.status(401).json({ message: 'providerId가 필요합니다.' });
  console.log(providerId);
  try {
    const requestUrl = `${API_SERVER_URL}/provider/bookmark`;
    const { data, status } = await axios.get(requestUrl, { params: { providerId } });
    console.log(data);
    return res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

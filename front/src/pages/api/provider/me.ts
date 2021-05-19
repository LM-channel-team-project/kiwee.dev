import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

import withCheckJwt from '@/wrapper/withCheckJwt';

import { API_SERVER_URL } from '@/config/constants';
import { JWT } from 'next-auth/jwt';

/**
 * 사용자 정보 요청
 * GET /provider/me
 */
export default withCheckJwt(async (req: NextApiRequest, res: NextApiResponse, token: JWT) => {
  const { sub: providerId } = token;
  if (req.method !== 'GET' || !providerId) return res.status(400).json({ message: 'not valid' });
  try {
    const requestUrl = `${API_SERVER_URL}/provider/me?providerId=${providerId}`;
    const { data, status } = await axios.get(requestUrl);
    console.log(data);
    return res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

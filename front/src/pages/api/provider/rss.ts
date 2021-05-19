import axios from 'axios';
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

import withCheckJwt from '@/wrapper/withCheckJwt';

import { API_SERVER_URL } from '@/config/constants';

/**
 * RSS 등록 요청
 * POST /provider/rss
 * body
 * {
 *    rssUrl: string
 * }
 */
export default withCheckJwt(async (req: NextApiRequest, res: NextApiResponse, token: jwt.JWT) => {
  const { rssUrl } = req.body;
  const { sub: providerId } = token;
  if (req.method !== 'POST') res.status(404).json({ message: 'not valid' });
  if (!providerId || !rssUrl)
    return res.status(401).json({ message: 'providerId, RssUrl이 필요합니다.' });

  try {
    const requestUrl = `${API_SERVER_URL}/provider/rss`;
    const { data, status } = await axios.post(requestUrl, { providerId, rssUrl });
    console.log(data);
    return res.status(status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

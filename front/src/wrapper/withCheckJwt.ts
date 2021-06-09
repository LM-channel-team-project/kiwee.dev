import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';
import jwt from 'next-auth/jwt';
import { JWT_SECRET } from '@/config/constants';

export default (
  handler: (req: NextApiRequest, res: NextApiResponse, token: jwt.JWT) => Promise<void>,
) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await jwt.getToken({ req, secret: JWT_SECRET });
    if (token) {
      // Signed in
      // // console.log('JSON Web Token', JSON.stringify(token, null, 2));
      return await handler(req, res, token);
    } else {
      // Not Signed in
      return res.status(401).json({ message: 'Token Not Found.' });
    }
  } catch (e) {
    const message = e.message;
    return res.status(401).json({ message });
  }
};

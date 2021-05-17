import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';
import jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

export default (handler: (req: NextApiRequest, res: NextApiResponse) => void) => async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const token = await jwt.getToken({ req, secret });
    if (token) {
      // Signed in
      console.log('JSON Web Token', JSON.stringify(token, null, 2));
      return handler(req, res);
    } else {
      // Not Signed in
      return res.status(401).json({ message: 'Token Not Found.' });
    }
  } catch (e) {
    const message = e.message;
    return res.status(401).json({ message });
  }
};

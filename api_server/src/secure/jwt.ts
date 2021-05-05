import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.env',
});

const JWT_SECRET = process.env.JWT_SECRET as string;

const JwtUtils = class {
  private secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }
  sign(email: string) {
    return jwt.sign({ email, iat: Date.now() }, this.secret, {
      algorithm: 'HS256',
      issuer: 'team10',
      expiresIn: '24h',
    });
  }
  verify(token: string) {
    // TODO error message별 예외처리
    try {
      const verified = jwt.verify(token, this.secret);
      console.log(verified);
      return true;
    } catch (e) {
      return false;
    }
  }
};

export default new JwtUtils(JWT_SECRET);

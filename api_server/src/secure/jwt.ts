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
};

export default new JwtUtils(JWT_SECRET);
import NextAuth, { Account, NextAuthOptions, Profile, Session, User } from 'next-auth';
import { Awaitable, NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';

const JWT_SECRET = process.env.JWT_SECRET;

const jsonify = (obj: any) => JSON.stringify(obj, null, 2);
const options: NextAuthOptions = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  jwt: {
    secret: JWT_SECRET,
  },
  // database: process.env.DB_URL,
  callbacks: {
    signIn(user: User, account: Account, profile: Profile): Awaitable<string | boolean> {
      // TODO API 서버에 사용자 정보 저장 or 업데이트 요청
      console.log(`user: ${jsonify(user)}`);
      console.log(`account: ${jsonify(account)}`);
      console.log(`profile: ${jsonify(profile)}`);
      return true;
    },
    session(session: Session, userOrToken: User | JWT): Awaitable<Session> { 
      console.log(`session: ${jsonify(session)}`);
      console.log(`userOrToken: ${jsonify(userOrToken)}`);
      session.sub = userOrToken.sub;
      return session;
    },
    jwt(
      token: JWT,
    ): Awaitable<JWT> {
      console.log(`token: ${jsonify(token)}`);
      return token;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

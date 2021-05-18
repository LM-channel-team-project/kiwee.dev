import axios from 'axios';
import NextAuth, { Account, NextAuthOptions, Profile, Session, User } from 'next-auth';
import { Awaitable, NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';

const JWT_SECRET = process.env.JWT_SECRET;
const GITHUB_EMAIL_API = 'https://api.github.com/user/emails';
const API_SERVER_URL = process.env.API_SERVER_URL;

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
    encryption: true,
  },
  session: { jwt: true },
  callbacks: {
    async signIn(user: User, account: Account, profile: Profile): Promise<string | boolean> {
      // TODO API 서버에 사용자 정보 저장 or 업데이트 요청
      console.log(`user: ${jsonify(user)}`);
      console.log(`account: ${jsonify(account)}`);
      console.log(`profile: ${jsonify(profile)}`);

      // Oauth Login 이후 반환된 회원 정보 추가 및 업데이트 요청 (Upsert)
      try {
        const { provider, accessToken } = account;
        const { id: providerId, image: avatar, name } = user;
        let { email } = user;

        // fetch email
        if (provider === 'github') {
          const response = await axios.get(GITHUB_EMAIL_API, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const { email: responseEmail } = response.data[0];

          if (!responseEmail) {
            return false;
          }
          email = responseEmail;
        }

        const response = await axios.post(`${API_SERVER_URL}/provider`, {
          providerId,
          email,
          avatar,
          name,
        });
        console.log(`${API_SERVER_URL}/provider`, response.data);
      } catch (e) {
        console.log(`${API_SERVER_URL}/provider`, e.message);
      }

      return true;
    },
    session(session: Session, userOrToken: User | JWT): Awaitable<Session> {
      session.sub = userOrToken.sub;
      if (userOrToken.accessToken) {
        session.accessToken = userOrToken.accessToken;
      }

      return session;
    },
    jwt(token, _, account): Awaitable<JWT> {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
};
export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

import withCheckJwt from '@/wrapper/withCheckJwt';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

// TODO token의 sub을 통해 API 서버에 회원 정보를 요청
export default withCheckJwt(async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({ message: 'okay' });
});

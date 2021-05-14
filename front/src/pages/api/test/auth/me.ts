import type { NextApiRequest, NextApiResponse } from 'next';

// type DataType = {
//   providerId: string;
//   providerEmail: string;
//   providerName: string;
//   providerAvatar: string;
// };
type ErrorType = {
  error: string;
};

export default (req: NextApiRequest, res: NextApiResponse<User | ErrorType>) => {
  const accessToken = (req.headers.authorization as string).split(' ')[1];
  console.log(accessToken);
  if (accessToken) {
    res.status(200).json({
      providerId: '123123',
      providerEmail: 'zmn5119@gmail.com',
      providerName: 'Euntaek Kim',
      providerAvatar:
        'https://lh3.googleusercontent.com/ogw/ADGmqu8Dvbr05-UQUb4JNAgLSUIyoHI2ggW0WSuX6WOEtw=s192-c-mo',
    });
    return;
  }
  res.status(401).json({ error: 'Unauthorized' });
};

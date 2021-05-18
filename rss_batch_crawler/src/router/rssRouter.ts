import { Request, Response, Router } from 'express';
import { checkRss } from '../app';
import ProviderRepository from '../repository/ProviderRepository';

const router = Router();
router.get('/', async (req: Request, res: Response) => {
  const { providerId, rssUrl } = req.query;
  if (!providerId)
    return res.status(401).json({ message: 'must send providerId' });
  if (!rssUrl) return res.status(401).json({ message: 'must send rssUrl.' });

  try {
    const provider = await ProviderRepository.findProviderbyId(
      providerId as string
    );
    if (!provider)
      return res.status(404).json({ message: 'provider not found.' });
    const { name, avatar, lastModifiedTime, email } = provider;
    const result = await checkRss({
      name,
      email,
      avatar,
      providerId: providerId as string,
      rssLink: rssUrl as string,
      lastModifiedTime: lastModifiedTime || new Date(0),
    });
    console.log('rss', result);
    return res.status(200).json({ message: 'ok' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'server error.' });
  }
});
export default router;

import dotenv from 'dotenv';

import { server } from './server';
import atlasConnect from './atlasClient'

dotenv.config({
  path: '.env',
});

const listen = (port = process.env.port || 8080) => {
  server.app.listen(port, () => console.log(`Listening on port ${port}`));
};

atlasConnect();
listen();

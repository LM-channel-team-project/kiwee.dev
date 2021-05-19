import Server from './server';
import AtlasClient from './atlasClient';

(async () => {
  await AtlasClient.connect();
  Server.listen();
})();

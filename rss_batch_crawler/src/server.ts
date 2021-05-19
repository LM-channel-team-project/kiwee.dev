import express, { Express } from 'express';
import rssRouter from './router/rssRouter';

const Server = class {
  public app: Express;
  private port: number;
  constructor(port: number) {
    this.port = port;
    this.app = express();
    // add middleware
    this.app.use(express.json());
    // add router
    this.app.use('/rss', rssRouter);
  }
  listen() {
    this.app.listen(this.port, () =>
      console.log(`Listening on port ${this.port}`)
    );
  }
};
export default new Server(Number(process.env.port || 8082));

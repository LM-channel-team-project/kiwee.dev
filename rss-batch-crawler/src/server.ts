import dotenv from 'dotenv';
import express from 'express';
// router
import providerRouter from './router/providerRouter';

dotenv.config({
  path: '.dev.env',
});

const Server = class {
  public app;
  private port;
  constructor(port = process.env.port || 8080) {
    this.port = port;
    this.app = express();
    // add middleware
    this.app.use(express.json());
    // add router
    this.app.use('/provider', providerRouter);
  }
  listen() {
    this.app.listen(this.port, () =>
      console.log(`Listening on port ${this.port}`)
    );
  }
};
export default new Server();

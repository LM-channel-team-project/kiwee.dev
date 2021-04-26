import express from 'express'

const Server = class {
  public app = express();
};
export const server = new Server();
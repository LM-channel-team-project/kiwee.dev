import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// router
import providerRouter from './router/providerRouter';
import articleRouter from './router/articleRouter';
import likesRouter from './router/likesRouter';
import bookmarksRouter from './router/bookmarkRouter';
import historyRouter from './router/historyRouter';

dotenv.config({
  path: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.env',
});

const PORT = Number(process.env.PORT);

const swaggerOption = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '기술블로그 모아보기 서비스 Express API with Swagger',
      version: '0.1.0',
      description: 'team10 기술블로그 모아보기 서비스(임시)의 API Docs입니다.',
    },
    servers: [
      {
        url: 'http://localhost:8080/',
      },
    ],
    ResponseMessage: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
  },
  apis: ['./src/router/*.ts'],
};

const Server = class {
  public app: Express;
  private port: number;
  constructor(port: number, corsOptions: CorsOptions) {
    this.port = port;
    this.app = express();
    // add middleware
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerJsDoc(swaggerOption), { explorer: true }),
    );
    // add router
    this.app.use('/provider', providerRouter);
    this.app.use('/articles', articleRouter);
    this.app.use('/likes', likesRouter);
    this.app.use('/bookmarks', bookmarksRouter);
    this.app.use('/histories', historyRouter);
  }
  listen() {
    this.app.listen(this.port, '127.0.0.1', () => console.log(`Listening on port ${this.port}`));
  }
};
export default new Server(PORT || 8080, {
  origin: 'http://localhost:3000',
  allowedHeaders: '*',
  methods: '*',
});

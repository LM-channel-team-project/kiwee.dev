import dotenv from 'dotenv';
import mongoose from 'mongoose';

const isProd = process.env.NODE_ENV === 'prod';

dotenv.config({
  path: isProd ? '.env' : '.dev.env',
});

const ATLAS_URI = process.env.ATLAS_URI as string;
const ATLAS_DATABASE = process.env.ATLAS_DB_NAME as string;
const ATLAS_USERNAME = process.env.ATLAS_USERNAME as string;
const ATLAS_PASSWORD = process.env.ATLAS_PASSWORD as string;

const AtlasClient = class {
  private mongoose = mongoose;
  constructor() {
    const db = this.mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.on('open', () => {
      console.log('atlas db connected.');
    });
  }
  async connect() {
    await this.mongoose.connect(ATLAS_URI, {
      user: ATLAS_USERNAME,
      pass: ATLAS_PASSWORD,
      dbName: ATLAS_DATABASE,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
};

export default new AtlasClient();

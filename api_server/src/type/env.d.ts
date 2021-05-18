declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: number;
    ATLAS_URI: string;
    ATLAS_DATABASE: string;
    ATLAS_USERNAME: string;
    ATLAS_PASSWORD: string;
    JWT_SECRET: string;
    RESET_KEY: string;
    RSS_CRAWLER_URL: string;
  }
}

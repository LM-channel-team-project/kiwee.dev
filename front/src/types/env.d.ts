declare namespace NodeJS {
  export interface ProcessEnv {
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    DB_URL: string;
    JWT_SECRET: string;
    API_SERVER_URL: string;
  }
}

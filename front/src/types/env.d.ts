declare namespace NodeJS {
  export interface ProcessEnv {
    HOSTNAME: string;
    PORT: string;
    HOST: string;
    NEXT_PUBLIC_API_URL: string;
    API_SERVER_URL: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    DB_URL: string;
    JWT_SECRET: string;
  }
}

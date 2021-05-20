export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_SERVER = typeof window === 'undefined';
export const HOSTNAME = process.env.HOSTNAME;
export const PORT = parseInt(process.env.PORT);
export const HOST = process.env.HOST;

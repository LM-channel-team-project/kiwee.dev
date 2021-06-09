import { cache } from 'swr';

type KeyType = string | Array<unknown> | { [index: string]: unknown };

export const useDeleteErrorCache = (key?: KeyType) => {
  if (!key) {
    cache.keys().forEach((key) => key.startsWith('err@') && cache.delete(key));
  }
  const ERROR_KEY = typeof key === 'string' ? `err@${key}` : `err@${JSON.stringify(key)}`;
  cache.delete(ERROR_KEY);
};

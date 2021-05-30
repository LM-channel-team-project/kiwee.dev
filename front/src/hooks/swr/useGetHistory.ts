import useRequest, { Config } from './useRequest';

import { HistoriesResponse } from '@/types/response';
import { AxiosRequestConfig } from 'axios';

const request: AxiosRequestConfig = { url: '/history' };

export const GET_HISTORY_KEY = JSON.stringify(request);

export const useGetHistory = (confing?: Config<HistoriesResponse>) => {
  const { data: res } = useRequest<HistoriesResponse>(request, confing);
  return {
    histories: res?.data.histories,
  };
};

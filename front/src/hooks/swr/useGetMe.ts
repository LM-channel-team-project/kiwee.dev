import useRequest, { Config } from './useRequest';

import { ProviderMeResponse } from '@/types/response';
import { AxiosRequestConfig } from 'axios';

const request: AxiosRequestConfig = { url: '/provider/me' };

export const GET_ME_KEY = JSON.stringify(request);

export const useGetMe = (confing?: Config<ProviderMeResponse>) => {
  const { data: res, mutate } = useRequest<ProviderMeResponse>(request, confing);
  return {
    data: res?.data,
    mutate,
  };
};
import useRequest, { Config } from './useRequest';

import { ProviderMeResponse } from '@/types/response';

export const useGetMe = (confing?: Config<ProviderMeResponse>) => {
  const { data: res, mutate } = useRequest<ProviderMeResponse>({ url: '/provider/me' }, confing);
  return {
    data: res?.data,
    mutate,
  };
};

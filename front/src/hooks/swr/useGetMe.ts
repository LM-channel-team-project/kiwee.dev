import { AxiosRequestConfig } from 'axios';
import { useSession } from 'next-auth/client';

import { ProviderMeResponse } from '@/types/response';
import useRequest, { Config } from './useRequest';

const request: AxiosRequestConfig = { url: '/provider/me' };

export const GET_ME_KEY = JSON.stringify(request);

const useGetMe = (confing?: Config<ProviderMeResponse>) => {
  const [session] = useSession();

  const { data: res } = session ? useRequest<ProviderMeResponse>(request, confing) : { data: null };
  return {
    provider: res?.data.provider,
  };
};

export default useGetMe;

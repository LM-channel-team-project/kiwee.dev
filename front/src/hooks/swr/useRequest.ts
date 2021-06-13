import useSWR, { SWRConfiguration } from 'swr';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { client } from '@/lib/api';

export type GetRequest = AxiosRequestConfig | null;

export interface Config<Data = unknown, Error = unknown>
  extends Omit<SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>, 'initialData'> {
  initialData?: Data;
}

function useRequest<Data = unknown, Error = unknown>(
  request: AxiosRequestConfig,
  { initialData, ...config }: Config<Data, Error> = {},
) {
  return useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    JSON.stringify(request),
    () => client(request),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        config: request,
        headers: {},
        data: initialData,
      },
    },
  );
}

export default useRequest;

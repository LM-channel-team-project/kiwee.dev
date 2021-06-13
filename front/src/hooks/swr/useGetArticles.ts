import { useSWRInfinite, SWRInfiniteConfiguration } from 'swr';
import { AxiosError } from 'axios';

import { client } from '@/lib/api';
import { ArticlesResponse } from '@/types/response';
import { FilterType } from '@/types/apiType';

type Config<Error> = SWRInfiniteConfiguration<ArticlesResponse, AxiosError<Error>>;

function getKey(filter: FilterType | '') {
  return (index: number, prevData: ArticlesResponse | null) => {
    if (prevData && (!prevData.hasNextPage || index > prevData.totalPages)) return null;
    return `/articles?filter=${filter}&page=${index + 1}`;
  };
}

async function getArticles(url: string) {
  const response = await client.get<ArticlesResponse>(url);
  return response.data;
}

function useGetArticles<Error = unknown>(
  filter?: FilterType | Config<Error>,
  config?: Config<Error>,
) {
  const { data, mutate, isValidating, setSize } = useSWRInfinite(
    getKey(typeof filter === 'string' ? filter : ''),
    getArticles,
    config,
  );

  const articles = data ? data.flatMap((data) => data.data) : [];
  const onNextPage = () => setSize((size) => size + 1);

  return {
    articles,
    onNextPage,
    hasNextPage: data && data[data.length - 1] ? data[data.length - 1].hasNextPage : false,
    refresh: mutate,
    isValidating,
  };
}

export default useGetArticles;

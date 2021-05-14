import useSWR from 'swr';
import { testGetMe as fetcher } from '@/lib/api/auth/getMe';

function useGetMe() {
  const { data, mutate, error } = useSWR('getMe', fetcher);

  const loading = !data && !error;

  return {
    loading,
    user: data,
    mutate,
  };
}

export default useGetMe;

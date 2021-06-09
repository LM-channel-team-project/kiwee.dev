import { useRouter } from 'next/router';

import { useMutationObserverSetTarget } from '@/context/MutationObserverContext';
import { client } from '@/lib/api';
import { FilterType } from '@/types/apiType';

function useUpdateArticleInfo() {
  const router = useRouter();
  const setTarget = useMutationObserverSetTarget();

  const onUpdate = async (filter: FilterType, articleId: string, isSave: boolean) => {
    try {
      await client.post(`/${filter}`, { articleId, isSave });
      if (router.asPath !== '/') setTarget({ filter, articleId, isSave });
      return true;
    } catch (error) {
      console.error(`${filter} 업데이트 실패`);
      return false;
    }
  };

  return { onUpdate };
}

export default useUpdateArticleInfo;

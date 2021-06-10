import useRequest, { Config } from './useRequest';

import { ProviderArticleInfo, ProviderArticleInfos } from '@/types/response';
import { FilterType } from '@/types/apiType';

export function useGetArticlesInfos(filter: FilterType, confing?: Config<ProviderArticleInfos>) {
  const { data: res, mutate, isValidating } = useRequest<ProviderArticleInfos>(
    { url: `/${filter}` },
    confing,
  );
  const refresh = (info?: ProviderArticleInfo, shouldRevalidate = false) => {
    if (!res) return {};
    info
      ? mutate(
          { ...res, data: { ...res.data, infos: res.data.infos.concat(info) } },
          shouldRevalidate,
        )
      : mutate();
  };

  return {
    infos: res?.data.infos || [],
    refresh,
    mutate,
    isValidating,
  };
}

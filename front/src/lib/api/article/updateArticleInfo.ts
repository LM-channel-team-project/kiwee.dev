import { client } from '../client';
import { FilterType } from '@/types/apiType';

export async function updateArticleInfo(filter: FilterType, articleId: string, isSave: boolean) {
  try {
    await client.post(`/${filter}`, { articleId, isSave });
    return true;
  } catch (error) {
    console.error(`${filter} 업데이트 실패`);
    return false;
  }
}

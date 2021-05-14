import { test } from '../client';

export async function testGetMe() {
  const response = await test.get<User>('/auth/me');
  return response.data;
}

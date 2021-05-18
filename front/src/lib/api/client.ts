import axios from 'axios';

const TEST_ACCESS_TOKEN = 'test_token';

export const client = axios.create({
  withCredentials: true,
  headers: {
    // Authorization: `Bearer ${token}`,
  },
});

export const test = axios.create({
  headers: {
    Authorization: `Bearer ${TEST_ACCESS_TOKEN}`,
  },
});

client.defaults.baseURL = process.env.API_ENDPOINT;
test.defaults.baseURL = 'api/test';

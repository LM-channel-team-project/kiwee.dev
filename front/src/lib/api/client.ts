import axios from 'axios';
import { PUBLIC_API_URL } from '@/config/constants';

export const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL = PUBLIC_API_URL;

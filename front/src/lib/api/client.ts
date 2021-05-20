import axios from 'axios';
import { API_URL } from '@/config/constants';

export const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL = API_URL;

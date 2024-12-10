import axios, { AxiosInstance } from 'axios';
import { baseUrl } from '@/config/api';

export const client: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'X-API-KEY': 'eaf32ec7-79d1-4ad7-bc9f-09983f32fc8a',
    'Content-Type': 'application/json',
  },
});

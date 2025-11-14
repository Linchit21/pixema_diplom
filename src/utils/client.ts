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

//apikey #1 eaf32ec7-79d1-4ad7-bc9f-09983f32fc8a
//apikey #2 9c99de4e-56e7-4689-ad83-c76ca9177a9f


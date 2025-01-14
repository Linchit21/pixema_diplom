import axios, { AxiosInstance } from 'axios';
import { baseUrlAuth, refreshAccessTokenEndpoint } from '@/config/api-auth';
import { baseUrl } from '@/config/api';
import { requestRefreshAccessToken } from '@/services/auth';
import { jwt } from './jwt';

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

export const clientAuth: AxiosInstance = axios.create({
  baseURL: baseUrlAuth,
  timeout: 5000,
});

// Перехватчик запроса
clientAuth.interceptors.request.use(async (config) => {
  if (config.url === refreshAccessTokenEndpoint) return config;

  let tokens = jwt.getFromLocalStorage();

  if (!tokens) return config;

  if (jwt.isAccessTokenExpired(tokens.access)) {
    const newAccessToken = await requestRefreshAccessToken(tokens.refresh);
    tokens = { ...tokens, access: newAccessToken };
    jwt.setToLocalStorage(tokens);
  }

  config.headers.Authorization = `Bearer ${tokens.access}`;
  return config;
});

// Перехватчик ответа
clientAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.status == 401) {
      window.location.href = '/auth/sign-in';
      localStorage.removeItem('jwt');
    }

    return Promise.reject(error);
  }
);

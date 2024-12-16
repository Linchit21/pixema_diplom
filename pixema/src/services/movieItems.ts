import {
  movieItemEndpoint,
  movieItemsEndpoint,
  movieItemsFilterEndpoint,
  movieItemsSimilarEndpoint,
  moviePremieresItemsEndpoint,
} from '@/config/api';
import { client } from '@/utils/client';

export const requestMovieItems = async () => {
  const response = await client.get(movieItemsEndpoint, {
    params: {
      type: 'TOP_250_MOVIES', // Передаем параметры запроса
      page: '1',
    },
  });

  return response.data.items;
};

export const requestMovieItem = async (id) => {
  const response = await client.get(movieItemEndpoint(id));

  return response.data;
};

export const requestPremieresItems = async () => {
  const response = await client.get(moviePremieresItemsEndpoint, {
    params: {
      year: '2024', // Передаем параметры запроса
      month: 'OCTOBER',
    },
  });

  return response.data.items;
};

export const requestFilterItems = async (body) => {
  const response = await client.get(movieItemsFilterEndpoint, {
    params: {
      ...body,
    },
  });

  return response.data.items;
};

export const requestMovieSimilaryItems = async (id) => {
  const response = await client.get(movieItemsSimilarEndpoint(id));

  return response.data.items;
};

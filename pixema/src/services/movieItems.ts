import { ISearchFilterFormValues } from '@/components/SearchFilter/type';
import {
  movieItemEndpoint,
  movieItemsEndpoint,
  movieItemsFilterEndpoint,
  movieItemsSimilarEndpoint,
  moviePremieresItemsEndpoint,
} from '@/config/api';
import { client } from '@/utils/client';

export interface IRequestMovieItemsParams {
  type: string;
  page: number;
}

export const requestMovieItems = async (params: IRequestMovieItemsParams) => {
  const response = await client.get(movieItemsEndpoint, {
    params,
  });

  return response.data;
};

export const requestMovieItem = async (id) => {
  const response = await client.get(movieItemEndpoint(id));

  return response.data;
};

export const requestPremieresItems = async (params) => {
  const response = await client.get(moviePremieresItemsEndpoint, {
    params,
  });

  return response.data;
};

interface RequestFilterItemsParams extends ISearchFilterFormValues {}

export const requestFilterItems = async (params: RequestFilterItemsParams) => {
  const response = await client.get(movieItemsFilterEndpoint, {
    params,
  });

  return response.data.items;
};

export const requestMovieSimilaryItems = async (id) => {
  const response = await client.get(movieItemsSimilarEndpoint(id));

  return response.data.items;
};

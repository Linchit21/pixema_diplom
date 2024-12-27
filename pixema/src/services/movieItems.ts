import { ISearchFilterFormValues } from '@/components/SearchFilter/type';
import {
  movieItemEndpoint,
  movieItemsFilterEndpoint,
  movieItemsSimilarEndpoint,
  moviePremieresItemsEndpoint,
} from '@/config/api';
import { IMovieArticle } from '@/types/movie/movie';
import { client } from '@/utils/client';

export const requestMovieItem = async (id: string) => {
  const response = await client.get(movieItemEndpoint(id));

  return response.data;
};

export interface IRequestPremieresItemsParams {
  year: string;
  month: string;
  page?: number;
}

export interface IRequestPremieresItemsResponse {
  total: number;
  items: IMovieArticle[];
}

export const requestPremieresItems = async (
  params: IRequestPremieresItemsParams
) => {
  const response = await client.get<IRequestPremieresItemsResponse>(
    moviePremieresItemsEndpoint,
    {
      params,
    }
  );

  return response.data;
};

interface RequestFilterItemsParams extends ISearchFilterFormValues {
  page?: number;
}

export interface IRequestFilterItemsResponse {
  total: number;
  items: IMovieArticle[];
  page?: number;
}

export const requestFilterItems = async (params: RequestFilterItemsParams) => {
  const response = await client.get<IRequestFilterItemsResponse>(
    movieItemsFilterEndpoint,
    {
      params,
    }
  );

  return response.data;
};

export interface IRequestMovieSimilaryItemsResponse {
  total: number;
  items: IMovieArticle[];
}

export const requestMovieSimilaryItems = async (
  id: string
): Promise<IMovieArticle[]> => {
  const response = await client.get<IRequestMovieSimilaryItemsResponse>(
    movieItemsSimilarEndpoint(id)
  );

  return response.data.items;
};

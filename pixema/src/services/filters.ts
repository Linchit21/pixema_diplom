import { filtersEndpoint } from '@/config/api';
import { IFiltersCountries, IFiltersGenres } from '@/types/filters/filters';
import { client } from '@/utils/client';

export interface IRequestFiltersResponse {
  genres: IFiltersGenres[];
  countries: IFiltersCountries[];
}

export const requestFilters = async () => {
  const response = await client.get<IRequestFiltersResponse>(filtersEndpoint);

  return response.data;
};

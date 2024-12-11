import { filtersEndpoint } from '@/config/api';
import { client } from '@/utils/client';

export const requestFilters = async () => {
  const response = await client.get(filtersEndpoint);

  return response.data;
};

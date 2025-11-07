export const baseUrl = 'https://kinopoiskapiunofficial.tech';
export const movieItemsFilterEndpoint = '/api/v2.2/films';
export const moviePremieresItemsEndpoint = '/api/v2.2/films/premieres';
export const movieItemEndpoint = (id: string) => `/api/v2.2/films/${id}`;
export const filtersEndpoint = '/api/v2.2/films/filters';
export const movieItemsSimilarEndpoint = (id: string) =>
  `/api/v2.2/films/${id}/similars`;

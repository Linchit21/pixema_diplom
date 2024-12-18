export const baseUrl = 'https://kinopoiskapiunofficial.tech';
export const movieItemsEndpoint = '/api/v2.2/films/collections';
export const movieItemsFilterEndpoint = '/api/v2.2/films';
export const moviePremieresItemsEndpoint = '/api/v2.2/films/premieres';
export const movieItemEndpoint = (id: string) => `/api/v2.2/films/${id}`;
export const filtersEndpoint = '/api/v2.2/films/filters';
export const movieItemsSimilarEndpoint = (id: string) =>
  `/api/v2.2/films/${id}/similars`;

//https://kinopoiskapiunofficial.tech/documentation/api/#/
//'X-API-KEY': 'eaf32ec7-79d1-4ad7-bc9f-09983f32fc8a',

//TODO: Разделить на 2 файла
export const baseUrlAuth = 'https://studapi.teachmeskills.by';
export const signUpEndpoint = '/auth/users/';
export const authActivationEndpoint = '/auth/users/activation/';
export const signInEndpoint = '/auth/jwt/create/';
export const usernameEndpoint = '/auth/users/me/';
export const refreshAccessTokenEndpoint = 'auth/jwt/refresh/';

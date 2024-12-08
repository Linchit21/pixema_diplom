export const baseUrl = 'https://www.omdbapi.com/?apikey=3ded1844&';
export const movieItemsEndpoint = (search) => `${baseUrl + `s=${search}&`}`;
//TODO: придумать пропсы для эндпоинтов

// http://www.omdbapi.com/?i=tt3896198&apikey=3ded1844

// http://www.omdbapi.com/?t=car&apikey=3ded1844

// http://www.omdbapi.com/?apikey=3ded1844&

// https://www.omdbapi.com/?apikey=3ded1844&t=hell

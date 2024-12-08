import { movieItemEndpoint, movieItemsEndpoint } from '@/config/api';

export const requestMovieItems = async (filter) => {
  const response = await fetch(movieItemsEndpoint(filter), {
    method: 'GET',
  })
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(function (data) {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      return data;
    });

  return response.Search;
};

export const requestMovieItem = async (id) => {
  const response = await fetch(movieItemEndpoint(id), {
    method: 'GET',
  })
    .then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(function (data) {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      return data;
    });

  return response;
};

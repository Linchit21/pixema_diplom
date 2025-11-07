export interface IMovieArticle {
  posterUrl: string;
  nameRu: string;
  genres: IMovieGenres[];
  kinopoiskId: string;
  filmId: string;
  description: string;
  year: number;
  ratingAgeLimits: string;
  filmLength: number;
  countries: IMovieCountries[];
  ratingKinopoisk: string;
  ratingImdb: string;
  imdbId: string;
  webUrl: string;
}

export interface IMovieGenres {
  genre: string;
}
export interface IMovieCountries {
  country: string;
}

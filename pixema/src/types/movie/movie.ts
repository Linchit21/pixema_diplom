export interface IMovieArticle {
  posterUrl: string;
  nameRu: string;
  genres: IMovieGenres[];
  kinopoiskId: string;
  filmId: string;
  description: string;
  year: number;
  ratingAgeLimits: number;
  filmLength: number;
  countries: IMovieCountries[];
}

export interface IMovieGenres {
  genre: string;
}
export interface IMovieCountries {
  country: string;
}

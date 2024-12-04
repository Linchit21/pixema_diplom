interface IMovieGenre {
  name: string;
}

interface IMovieRating {
  kp: number;
  imdb: number;
}

interface IMoviePoster {
  url: string;
  previewUrl: string;
}

export interface IMovie {
  id: number;
  name: string;
  genres: IMovieGenre[];
  rating: IMovieRating;
  poster?: IMoviePoster;
}

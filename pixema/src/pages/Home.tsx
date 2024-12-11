import { MovieList } from '@/components/MovieList';

import { fetchMovieItemsThunk } from '@/redux/movie-items-slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function Home() {
  const dispatch = useDispatch();

  // type
  // page
  // /api/v2.2/films/premieres

  useEffect(() => {
    dispatch(fetchMovieItemsThunk());
  }, []);

  return <MovieList />;
}

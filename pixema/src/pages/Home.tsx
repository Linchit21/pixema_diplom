import { MovieList } from '@/components/MovieList';
import { fetchMovieItemsThunk } from '@/redux/movie-items-slice';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function Home() {
  const dispatch: AppDispatch = useDispatch();

  // type
  // page
  // /api/v2.2/films/premieres

  useEffect(() => {
    dispatch(fetchMovieItemsThunk());
  }, [dispatch]);

  return <MovieList />;
}

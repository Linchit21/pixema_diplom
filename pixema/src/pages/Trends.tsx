import { MovieList } from '@/components/MovieList';
import { fetchPremieresItemsThunk } from '@/redux/movie-items-slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function Trends() {
  const dispatch = useDispatch();

  // year
  // month
  // /api/v2.2/films/collections

  useEffect(() => {
    dispatch(fetchPremieresItemsThunk());
  }, []);

  return <MovieList />;
}

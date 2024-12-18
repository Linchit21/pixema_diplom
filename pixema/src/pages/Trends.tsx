import { MovieList } from '@/components/MovieList';
import {
  fetchPremieresItemsThunk,
  resetMovieItems,
} from '@/redux/movie-items-slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function Trends() {
  const dispatch = useDispatch();
  const fetchData = () =>
    dispatch(fetchPremieresItemsThunk({ year: '2024', month: 'OCTOBER' }));

  // year
  // month
  // /api/v2.2/films/collections

  useEffect(() => {
    fetchData();

    //При уничтожении компонента, сбрасываем стэйт
    return () => {
      dispatch(resetMovieItems());
    };
  }, []);

  return <MovieList showMoreCallback={() => fetchData()} />;
}

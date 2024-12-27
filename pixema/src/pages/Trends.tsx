import { MovieList } from '@/components/MovieList';
import {
  fetchPremieresItemsThunk,
  resetMovieItems,
} from '@/redux/movie-items-slice';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function Trends() {
  const dispatch: AppDispatch = useDispatch();
  const fetchData = () =>
    dispatch(fetchPremieresItemsThunk({ year: '2024', month: 'OCTOBER' }));

  useEffect(() => {
    fetchData();

    //При уничтожении компонента, сбрасываем стэйт
    return () => {
      dispatch(resetMovieItems());
    };
  }, []);

  return <MovieList showMoreCallback={() => fetchData()} />;
}

import { MovieList } from '@/components/MovieList';
import {
  fetchPremieresItemsThunk,
  resetMovieItems,
} from '@/redux/movie-items-slice';
import { AppDispatch } from '@/redux/store';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function Trends() {
  const dispatch: AppDispatch = useDispatch();

  
  useEffect(() => {
    dispatch(fetchPremieresItemsThunk({ year: '2025', month: 'JUNE' }));
    
    return () => {
      dispatch(resetMovieItems());
    };
  }, [dispatch]);
  
  const showMoreCallback = useCallback(
    () =>
      dispatch(fetchPremieresItemsThunk({ year: '2024', month: 'OCTOBER' })),
    [dispatch]
  );

  return <MovieList showMoreCallback={showMoreCallback} />;
}

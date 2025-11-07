import { MovieList } from '@/components/MovieList';
import {
  fetchFilterItemsThunk,
  resetMovieItems,
} from '@/redux/movie-items-slice';
import { AppDispatch } from '@/redux/store';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export function Home() {
  const dispatch: AppDispatch = useDispatch();

  // Загружаем фильмы при монтировании и сбрасываем при размонтировании
  useEffect(() => {
    dispatch(fetchFilterItemsThunk({ratingFrom: 1, ratingTo: 9}));

    return () => {
      dispatch(resetMovieItems());
    };
  }, [dispatch]);

  // Мемоизируем callback для передачи в MovieList
  const showMoreCallback = useCallback(
    () => dispatch(fetchFilterItemsThunk()),
    [dispatch]
  );

  return <MovieList showMoreCallback={showMoreCallback} />;
}

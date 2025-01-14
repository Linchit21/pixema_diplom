import { MovieList } from '@/components/MovieList';
import {
  fetchFilterItemsThunk,
  resetMovieItems,
} from '@/redux/movie-items-slice';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function Home() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    //При уничтожении компонента, сбрасываем стэйт
    return () => {
      dispatch(resetMovieItems());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchFilterItemsThunk());
  }, []);

  return (
    <MovieList showMoreCallback={() => dispatch(fetchFilterItemsThunk())} />
  );
}

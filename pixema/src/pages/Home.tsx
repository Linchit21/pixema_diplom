import { MovieList } from '@/components/MovieList';
import {
  fetchFilterItemsThunk,
  resetMovieItems,
} from '@/redux/movie-items-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { search } = useSelector((state: RootState) => state.movieItems);

  useEffect(() => {
    //При уничтожении компонента, сбрасываем стэйт
    return () => {
      dispatch(resetMovieItems());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchFilterItemsThunk());
  }, [search]);

  return (
    <MovieList showMoreCallback={() => dispatch(fetchFilterItemsThunk())} />
  );
}

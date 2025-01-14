import { MovieList } from '@/components/MovieList';
import {
  fetchFilterItemsThunk,
  resetMovieItems,
} from '@/redux/movie-items-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

export function ResultSearch() {
  const dispatch: AppDispatch = useDispatch();
  const { search } = useSelector((state: RootState) => state.movieItems);
  const { keyword } = useParams();

  useEffect(() => {
    //При уничтожении компонента, сбрасываем стэйт
    return () => {
      dispatch(resetMovieItems());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchFilterItemsThunk({ ...search, keyword }));
  }, [search]);

  return (
    <MovieList
      showMoreCallback={() =>
        dispatch(fetchFilterItemsThunk({ ...search, keyword }))
      }
    />
  );
}

import { MovieList } from '@/components/MovieList';
import {
  fetchFilterItemsThunk,
  resetMovieItems,
} from '@/redux/movie-items-slice';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

export function SearchResult() {
  const { searchId } = useParams();
  const dispatch: AppDispatch = useDispatch();

  //Нужна была проверка на undefined
  const keyWordQuery = () => {
    if (searchId) {
      return { keyword: searchId };
    } else return { keyword: '' };
  };

  useEffect(() => {
    dispatch(fetchFilterItemsThunk(keyWordQuery()));

    return () => {
      dispatch(resetMovieItems());
    };
  }, [searchId]);

  return (
    <MovieList
      showMoreCallback={() => dispatch(fetchFilterItemsThunk(keyWordQuery()))}
    />
  );
}

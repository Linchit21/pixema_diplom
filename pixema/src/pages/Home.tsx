import { MovieList } from '@/components/MovieList';
import {
  fetchMovieItemsThunk,
  resetMovieItems,
} from '@/redux/movie-items-slice';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function Home() {
  const dispatch: AppDispatch = useDispatch();

  // type
  // page
  // /api/v2.2/films/premieres

  //TODO: pagination

  useEffect(() => {
    dispatch(fetchMovieItemsThunk({ type: 'TOP_POPULAR_ALL' }));

    //При уничтожении компонента, сбрасываем стэйт
    return () => {
      dispatch(resetMovieItems());
    };
  }, []);

  return (
    <MovieList
      showMoreCallback={() =>
        dispatch(fetchMovieItemsThunk({ type: 'TOP_POPULAR_ALL' }))
      }
    />
  );
}

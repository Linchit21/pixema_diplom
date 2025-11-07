import { MovieId } from '@/components/MovieId';
import {
  fetchMovieItemThunk,
  fetcMovieSimialryItemsThunk,
  resetMovieItems,
} from '@/redux/movie-items-slice';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

export function Movie() {
  const dispatch: AppDispatch = useDispatch();
  const { movieId } = useParams<{ movieId: string | undefined }>();

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieItemThunk(movieId));
      dispatch(fetcMovieSimialryItemsThunk(movieId));
    }

    return () => {
      dispatch(resetMovieItems());
    };
  }, [dispatch, movieId]);

  return <MovieId />;
}

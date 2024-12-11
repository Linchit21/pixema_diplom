import { MovieList } from '@/components/MovieList';
import { fetchFilterItemsThunk } from '@/redux/movie-items-slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

export function SearchResult() {
  const { searchId } = useParams();
  const dispatch = useDispatch();

  //api/v2.2/films

  useEffect(() => {
    dispatch(fetchFilterItemsThunk({ keyword: searchId }));
  }, [searchId]);

  return <MovieList />;
}

import { MovieList } from '@/components/MovieList';
import { useParams } from 'react-router';

export function SearchResult() {
  const { searchId } = useParams();
  return <MovieList filter={searchId} />;
}

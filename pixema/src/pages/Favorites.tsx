import { MovieItem } from '@/components/MovieItem';
import { RootState } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';

export function Favorites() {
  const { favoriteItems } = useSelector((state: RootState) => state.movieItems);

  //api/v2.2/films

  return (
    <div>
      {favoriteItems.map((item, index) => {
        return <MovieItem key={index} movieData={item} />;
      })}
    </div>
  );
}

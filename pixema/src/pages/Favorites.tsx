import { MovieId } from '@/components/MovieId';
import { MovieItem } from '@/components/MovieItem';
import { MovieList } from '@/components/MovieList';
import { fetchFilterItemsThunk } from '@/redux/movie-items-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

export function Favorites() {
  const { favoriteItems } = useSelector((state) => state.movieItems);

  //api/v2.2/films

  return (
    <div>
      {favoriteItems.map((item, index) => {
        return <MovieItem key={index} movieData={item} />;
      })}
    </div>
  );
}

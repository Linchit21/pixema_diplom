import { EmptyItem } from '@/components/EmptyItem';
import { MovieList } from '@/components/MovieList';
import { resetMovieItems, setFavoritesItems } from '@/redux/movie-items-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Favorites() {
  const dispatch: AppDispatch = useDispatch();
  const { movieItems } = useSelector((state: RootState) => state.movieItems);

  useEffect(() => {
    dispatch(setFavoritesItems());

    //При уничтожении компонента, сбрасываем стэйт
    return () => {
      dispatch(resetMovieItems());
    };
  }, []);

  const renderFavorites = () => {
    if (movieItems.length != 0) {
      return (
        <MovieList
          showMoreCallback={() => console.log} //FIXME: что сюда передать?
        />
      );
    } else {
      return <EmptyItem />;
    }
  };

  return <>{renderFavorites()}</>;
}

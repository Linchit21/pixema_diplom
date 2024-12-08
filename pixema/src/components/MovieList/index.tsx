import { MovieItem } from '@/components/MovieItem';
import styles from './index.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieItemsThunk } from '@/redux/movie-items-slice';

export function MovieList(props) {
  const dispatch = useDispatch();
  const { movieItems, isLoaded, error } = useSelector(
    (state) => state.movieItems
  );

  useEffect(() => {
    dispatch(fetchMovieItemsThunk(props.filter));
  }, [props.filter]);

  if (isLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (movieItems == undefined || movieItems.length == 0) {
    return <div>No posts</div>;
  }

  return (
    <div className={styles['movie-list__wrapper']}>
      <div className={styles['movie-list']}>
        {movieItems.map((item, index) => {
          return <MovieItem key={index} movieData={item} />;
        })}
      </div>
      <button className={styles['movie-list__button']} type="button">
        Show more
      </button>
    </div>
  );
}

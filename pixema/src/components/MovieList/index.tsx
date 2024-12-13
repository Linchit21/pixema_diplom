import { MovieItem } from '@/components/MovieItem';
import { IMovieItem } from '@/types/movie/movie';
import { useSelector } from 'react-redux';

import styles from './index.module.scss';
import { RootState } from '@/redux/store';

export function MovieList() {
  const { movieItems, isLoaded, error } = useSelector(
    (state: RootState) => state.movieItems
  );

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
        {movieItems.map((item: IMovieItem, index: number) => {
          return <MovieItem key={index} movieData={item} />;
        })}
      </div>
      <button className={styles['movie-list__button']} type="button">
        Show more
      </button>
    </div>
  );
}

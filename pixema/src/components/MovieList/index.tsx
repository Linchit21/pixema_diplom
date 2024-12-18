import { MovieItem } from '@/components/MovieItem';
import { IMovieArticle } from '@/types/movie/movie';
import { useSelector } from 'react-redux';

import styles from './index.module.scss';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';

interface MovieListProps {
  showMoreCallback: () => void;
}

export function MovieList({ showMoreCallback }: MovieListProps) {
  const { movieItems, total, error, isLoaded } = useSelector(
    (state: RootState) => state.movieItems
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  if (movieItems == undefined || movieItems.length == 0) {
    return <div>No posts</div>;
  }

  const handleClickShowMore = () => {
    showMoreCallback();
    event?.preventDefault();
  };

  return (
    <div className={styles['movie-list__wrapper']}>
      <div className={styles['movie-list']}>
        {movieItems.map((item: IMovieArticle, index: number) => {
          return <MovieItem key={index} movieData={item} />;
        })}
      </div>
      {total > movieItems.length && (
        <button
          className={styles['movie-list__button']}
          type="button"
          onClick={handleClickShowMore}
        >
          Show more
          {isLoaded && (
            <img
              className={styles['movie-list__spinner']}
              src="/public/icons/spinner.svg"
              alt=""
            />
          )}
        </button>
      )}
    </div>
  );
}

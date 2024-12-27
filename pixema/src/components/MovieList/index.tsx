import { MovieItem } from '@/components/MovieItem';
import { IMovieArticle } from '@/types/movie/movie';
import { useSelector } from 'react-redux';

import styles from './index.module.scss';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { EmptyItem } from '../EmptyItem';
import { createClassName } from '@/utils/className';

interface MovieListProps {
  showMoreCallback: () => void;
}

export function MovieList({ showMoreCallback }: MovieListProps) {
  const cn = createClassName(styles, 'movie-list');
  const { movieItems, total, error, isLoaded } = useSelector(
    (state: RootState) => state.movieItems
  );
  console.log(movieItems);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  if (movieItems == undefined || movieItems.length == 0) {
    return <EmptyItem />;
  }

  const handleClickShowMore = () => {
    showMoreCallback();
  };

  return (
    <div className={cn('wrapper')}>
      <div className={cn()}>
        {movieItems.map((item: IMovieArticle, index: number) => (
          <MovieItem key={index} movieData={item} />
        ))}
      </div>
      {total > movieItems.length && (
        <button
          className={cn('button')}
          type="button"
          onClick={handleClickShowMore}
        >
          Show more
          {isLoaded && (
            <img
              className={cn('spinner')}
              src="/public/icons/spinner.svg"
              alt=""
            />
          )}
        </button>
      )}
    </div>
  );
}

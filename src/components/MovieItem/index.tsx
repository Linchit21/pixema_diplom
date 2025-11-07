import { IMovieArticle } from '@/types/movie/movie';
import { useNavigate } from 'react-router';
import { createClassName } from '@/utils/className';

import styles from './index.module.scss';

interface MovieItemProps {
  movieData: IMovieArticle;
}

export function MovieItem(props: MovieItemProps) {
  const cn = createClassName(styles, 'movie-item');
  const {
    movieData: { posterUrl, nameRu, genres, kinopoiskId, filmId },
  } = props;
  const navigate = useNavigate();

  const handleClickMovieItem = () => {
    if (kinopoiskId) {
      navigate(`/movie/${kinopoiskId}`);
    } else if (filmId) {
      // при запросе похожих фильмов, сервер отдает другое название id
      navigate(`/movie/${filmId}`);
    }
  };

  return (
    <div className={cn()} onClick={handleClickMovieItem}>
      <div className={cn('img-wrapper')}>
        <img className={cn('img')} src={posterUrl} alt={nameRu} />
      </div>
      <div className={cn('title')}>{nameRu}</div>
      <div className={cn('tags')}>
        {genres?.map((item, index) => (
          <div key={index} className={cn('tag')}>
            {item.genre}
          </div>
        ))}
      </div>
    </div>
  );
}

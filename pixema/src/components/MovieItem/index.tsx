import { IMovieArticle } from '@/types/movie/movie';
import styles from './index.module.scss';
import { useNavigate } from 'react-router';

interface MovieItemProps {
  movieData: IMovieArticle;
}

export function MovieItem(props: MovieItemProps) {
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
    <div className={styles['movie-item']} onClick={handleClickMovieItem}>
      <div className={styles['movie-item__img-wrapper']}>
        <img
          className={styles['movie-item__img']}
          src={posterUrl}
          alt={nameRu}
        />
      </div>
      <div className={styles['movie-item__title']}>{nameRu}</div>
      <div className={styles['movie-item__tags']}>
        {genres?.map((item, index) => {
          return (
            <div key={index} className={styles['movie-item__tag']}>
              {item.genre}
            </div>
          );
        })}
      </div>
    </div>
  );
}

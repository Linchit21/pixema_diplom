import { IMovie } from '@/types/movie';
import styles from './index.module.scss';

interface MovieItemProps {
  movieData: IMovie;
}

export function MovieItem(props: MovieItemProps) {
  const {
    movieData: { Poster, Title, Type, Year, imdbID },
  } = props;

  //TODO: переход на фильм
  const handleClickMovieItem = () => {};

  return (
    <div className={styles['movie-item']}>
      <div className={styles['movie-item__img-wrapper']}>
        <div className={styles['movie-item__rating']}>{10}</div>
        <img className={styles['movie-item__img']} src={Poster} alt="women" />
      </div>
      <div className={styles['movie-item__title']}>{Title}</div>
      <div className={styles['movie-item__tags']}>
        <div className={styles['movie-item__tag']}>{Type}</div>
        <div className={styles['movie-item__tag']}>{Year}</div>
      </div>
    </div>
  );
}

import { IMovie } from '@/types/movie';
import styles from './index.module.scss';
import { useNavigate } from 'react-router';

interface MovieItemProps {
  movieData: IMovie;
}

export function MovieItem(props: MovieItemProps) {
  const {
    movieData: { Poster, Title, Type, Year, imdbID },
  } = props;
  const navigate = useNavigate();

  //TODO: переход на фильм
  const handleClickMovieItem = () => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <div className={styles['movie-item']} onClick={handleClickMovieItem}>
      <div className={styles['movie-item__img-wrapper']}>
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

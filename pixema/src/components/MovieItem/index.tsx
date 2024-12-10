import { IMovie } from '@/types/movie';
import styles from './index.module.scss';
import { useNavigate } from 'react-router';

// interface MovieItemProps {
//   movieData: IMovie;
// }

export function MovieItem(props) {
  const {
    movieData: { posterUrl, nameRu, genres, kinopoiskId },
  } = props;
  const navigate = useNavigate();

  //TODO: переход на фильм
  const handleClickMovieItem = () => {
    navigate(`/movie/${kinopoiskId}`);
  };

  return (
    <div className={styles['movie-item']} onClick={handleClickMovieItem}>
      <div className={styles['movie-item__img-wrapper']}>
        <img
          className={styles['movie-item__img']}
          src={posterUrl}
          alt="women"
        />
      </div>
      <div className={styles['movie-item__title']}>{nameRu}</div>
      <div className={styles['movie-item__tags']}>
        {genres.map((item, index) => {
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

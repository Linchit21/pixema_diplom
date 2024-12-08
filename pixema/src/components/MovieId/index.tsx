import { useEffect } from 'react';
import styles from './index.module.scss';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieItemThunk } from '@/redux/movie-items-slice';
import trends from '/icons/favorites.svg';
import { MovieItem } from '../MovieItem';

export function MovieId() {
  const dispatch = useDispatch();
  const { movieItem, movieItems, isLoaded, error } = useSelector(
    (state) => state.movieItems
  );
  const { movieId } = useParams();

  const genre = movieItem.Genre ? movieItem.Genre.split(', ') : [];
  const ratings = movieItem.Ratings || [];
  console.log(genre);

  console.log(movieItem);

  useEffect(() => {
    dispatch(fetchMovieItemThunk(movieId));
  }, [movieId]);

  if (isLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (movieItem.length == 0) {
    return <div>No posts</div>;
  }

  return (
    <div className={styles['movie-id']}>
      <div className={styles['movie-id__preview']}>
        <div className={styles['movie-id__img-wrapper']}>
          <img
            className={styles['movie-id__img']}
            src={movieItem.Poster}
            alt={movieItem.Title}
          />
        </div>
        <div className={styles['movie-id__buttons']}>
          <button
            className={`${styles['movie-id__button']} ${styles['movie-id__button_left']}`}
            type="button"
          >
            <img src={trends} alt="" />
          </button>
          <button
            className={`${styles['movie-id__button']} ${styles['movie-id__button_right']}`}
            type="button"
          >
            <img src={trends} alt="" />
          </button>
        </div>
      </div>
      <div>
        <div className={styles['movie-id__tags']}>
          {genre.map((item, index) => {
            return (
              <div className={styles['movie-id__tag']} key={index}>
                {item}
              </div>
            );
          })}
        </div>
        <div className={styles['movie-id__title']}>{movieItem.Title}</div>
        {/* //FIXME: ratings */}
        <div className={styles['movie-id__ratings']}>
          <div className={styles['movie-id__ratings__imdb']}>IMDb</div>
          <div className={styles['movie-id__ratings__meta']}>
            {ratings[2]?.Value}
          </div>
          <div className={styles['movie-id__ratings__tomato']}>
            {ratings[1]?.Value}
          </div>
        </div>
        <div className={styles['movie-id__text']}>{movieItem.Plot}</div>
        <div>
          <ul className={styles['movie-id__list']}>
            <li>
              Year <span>{movieItem.Year}</span>
            </li>
            <li>
              Country <span>{movieItem.Country}</span>
            </li>
            <li>
              BoxOffice <span>{movieItem.BoxOffice}</span>
            </li>
            <li>
              Director <span>{movieItem.Director}</span>
            </li>
            <li>
              Language <span>{movieItem.Language}</span>
            </li>
            <li>
              Runtime <span>{movieItem.Runtime}</span>
            </li>
            <li>
              Actors <span>{movieItem.Actors}</span>
            </li>
          </ul>
        </div>
        <div className={styles['movie-id__recomendation']}>Recommendations</div>
        <div className={styles['movie-id__posters']}>
          {movieItems.map((item, index) => {
            return <MovieItem key={index} movieData={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

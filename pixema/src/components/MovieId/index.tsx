import { useEffect } from 'react';
import styles from './index.module.scss';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  favorite,
  fetchMovieItemsThunk,
  fetchMovieItemThunk,
} from '@/redux/movie-items-slice';
import favorites from '/icons/favorites.svg';
import favoritesActive from '/icons/favorites_active.svg';
import { MovieItem } from '../MovieItem';
import { AppDispatch, RootState } from '@/redux/store';
import { IMovieCountries, IMovieItem } from '@/types/movie/movie';

export function MovieId() {
  const dispatch: AppDispatch = useDispatch();
  const { movieItem, movieItems, favoriteItems, isLoaded, error } = useSelector(
    (state: RootState) => state.movieItems
  );

  const { movieId } = useParams<{ movieId: string | undefined }>();

  const find = favoriteItems.find(
    (item: IMovieItem) => item.kinopoiskId === movieId
  );

  console.log(find);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieItemThunk(movieId));
      dispatch(fetchMovieItemsThunk());
    }
  }, [dispatch, movieId]);

  const handleClickFavoriteButton = () => {
    if (movieItem) {
      dispatch(favorite(movieItem));
    }
    event?.preventDefault();
  };

  if (isLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movieItem) {
    return <div>No posts</div>;
  }

  const {
    posterUrl,
    nameRu,
    description,
    year,
    countries,
    ratingAgeLimits,
    filmLength,
    genres,
  } = movieItem;

  //FIXME: Должны быть рандомные фильмы, мб новый запрос?
  const recommendPosters = movieItems.slice(1, 4);

  return (
    <div className={styles['movie-id']}>
      <div className={styles['movie-id__preview']}>
        <div className={styles['movie-id__img-wrapper']}>
          <img
            className={styles['movie-id__img']}
            src={posterUrl}
            alt={nameRu}
          />
        </div>
        <div className={styles['movie-id__buttons']}>
          <button
            className={`${styles['movie-id__button']} ${styles['movie-id__button_left']}`}
            type="button"
            onClick={handleClickFavoriteButton}
          >
            <img src={find ? favoritesActive : favorites} alt="" />
          </button>
          <button
            className={`${styles['movie-id__button']} ${styles['movie-id__button_right']}`}
            type="button"
          >
            <img src={favorites} alt="" />
          </button>
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <div className={styles['movie-id__tags']}>
          {/* {genre.map((item, index) => {
            return (
              <div className={styles['movie-id__tag']} key={index}>
                {item}
              </div>
            );
          })} */}
        </div>
        <div className={styles['movie-id__title']}>{nameRu}</div>
        {/* //FIXME: ratings */}
        <div className={styles['movie-id__ratings']}>
          <div className={styles['movie-id__ratings__imdb']}>IMDb</div>
          <div className={styles['movie-id__ratings__meta']}>
            {/* {ratings[2]?.Value} */}
          </div>
          <div className={styles['movie-id__ratings__tomato']}>
            {/* {ratings[1]?.Value} */}
          </div>
        </div>
        <div className={styles['movie-id__text']}>{description}</div>
        <div className={styles['movie-id__list']}>
          <div className={styles['movie-id__list_col-key']}>
            <p>Год</p>
            <p>Страна</p>
            <p>Время</p>
            <p>Возраст</p>
            <p>Жанр</p>
          </div>
          <div className={styles['movie-id__list_col-string']}>
            <p>{year}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {countries?.map((item: IMovieCountries, index: number) => {
                return <p key={index}>{item.country}</p>;
              })}
            </div>
            <p>{filmLength}</p>
            <p>{ratingAgeLimits}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {genres?.map((item, index) => {
                return <p key={index}>{item.genre}</p>;
              })}
            </div>
          </div>
        </div>
        <div className={styles['movie-id__recomendation']}>Recommendations</div>
        <div className={styles['movie-id__posters']}>
          {recommendPosters.map((item, index) => {
            return <MovieItem key={index} movieData={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

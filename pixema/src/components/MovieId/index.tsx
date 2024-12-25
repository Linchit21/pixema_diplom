import { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { favorite, resetMovieItem } from '@/redux/movie-items-slice';
import favorites from '/icons/favorites.svg';
import share from '/icons/share.svg';
import favoritesActive from '/icons/favorites_active.svg';
import { MovieItem } from '../MovieItem';
import { AppDispatch, RootState } from '@/redux/store';
import { IMovieArticle, IMovieCountries } from '@/types/movie/movie';

//swiper
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { createClassName } from '@/utils/className';
import { ShareModal } from '../ShareButtons';

export function MovieId() {
  const dispatch: AppDispatch = useDispatch();
  const { movieItem, movieItems, favoriteItems, error } = useSelector(
    (state: RootState) => state.movieItems
  );
  const { movieId } = useParams<{ movieId: string | undefined }>();
  const cn = createClassName(styles, 'movie-id');
  console.log(movieItem);

  const [isVisible, setIsVisible] = useState(false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const find = favoriteItems.find(
    (item: IMovieArticle) => item.kinopoiskId == movieId
  );

  useEffect(() => {
    return () => {
      dispatch(resetMovieItem());
    };
  }, []);

  const handleClickFavoriteButton = () => {
    if (movieItem) {
      dispatch(favorite(movieItem));
    }
    event?.preventDefault();
  };

  const handleClickShareButton = () => {
    setIsVisible(!isVisible);
  };

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
    ratingKinopoisk,
    ratingImdb,
    imdbId,
    webUrl,
  } = movieItem;

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
            onClick={handleClickShareButton}
          >
            <img src={share} alt="" />
          </button>
          <div className={cn('share')}>
            <ShareModal title={nameRu} visible={isVisible} />
          </div>
        </div>
      </div>
      <div>
        <div className={styles['movie-id__tags']}>
          {genres?.map((item, index) => {
            return <p key={index}>{item.genre}</p>;
          })}
        </div>
        <div className={styles['movie-id__title']}>{nameRu}</div>
        <div className={styles['movie-id__ratings']}>
          {ratingKinopoisk && (
            <a
              href={webUrl}
              className={`${cn('rating')} ${cn('rating_kinopoisk')}`}
            >
              <img
                className={cn('img-kinopoisk')}
                src="/public/img/kinopoisk.png"
                alt=""
              />
              <p>{ratingKinopoisk}</p>
            </a>
          )}
          {ratingImdb && (
            <a
              href={`https://www.imdb.com/title/${imdbId}/`}
              className={`${cn('rating')} ${cn('rating_imdb')}`}
            >
              <img
                className={cn('img-imdb')}
                src="/public/img/imdb.png"
                alt=""
              />
              <p>{ratingImdb}</p>
            </a>
          )}
        </div>
        <div className={styles['movie-id__text']}>{description}</div>
        <div className={styles['movie-id__list']}>
          <div className={styles['movie-id__list_col-key']}>
            <p>Год</p>
            <p>Страна</p>
            <p>Время</p>
            <p>Возраст</p>
          </div>
          <div className={styles['movie-id__list_col-string']}>
            <p>{year}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {countries?.map((item: IMovieCountries, index: number) => {
                return <p key={index}>{item.country}</p>;
              })}
            </div>
            <p>{filmLength ?? 'Неизвестно'}</p>
            <p>{`${ratingAgeLimits.slice(3)} +`}</p>
          </div>
        </div>
        {movieItems.length != 0 && (
          <>
            <div className={styles['movie-id__recomendation']}>
              Recommendations
            </div>
            <div className={styles['movie-id__swiper']}>
              <button
                ref={prevRef}
                className={`${styles['movie-id__arrow-prev']} ${styles['movie-id__arrow']}`}
              >
                ←
              </button>
              <button
                ref={nextRef}
                className={`${styles['movie-id__arrow-next']} ${styles['movie-id__arrow']}`}
              >
                →
              </button>
              <Swiper
                slidesPerView={5}
                spaceBetween={280}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onInit={(swiper: SwiperClass) => {
                  // Связываем стрелки после инициализации
                  if (
                    prevRef.current &&
                    nextRef.current &&
                    nextRef.current &&
                    swiper.params.navigation &&
                    typeof swiper.params.navigation === 'object'
                  ) {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                  }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {movieItems?.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <MovieItem movieData={item} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

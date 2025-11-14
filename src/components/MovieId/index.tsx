import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { favorite, resetMovieItem } from '@/redux/movie-items-slice';
import { MovieItem } from '../MovieItem';
import { AppDispatch, RootState } from '@/redux/store';
import { IMovieArticle, IMovieCountries } from '@/types/movie/movie';
import favorites from '/icons/favorites.svg';
import share from '/icons/share.svg';
import favoritesActive from '/icons/favorites_active.svg';
import imdb from '/img/imdb.png';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { createClassName } from '@/utils/className';
import { ShareButtons } from '../ShareButtons';
import { EmptyItem } from '../EmptyItem';

import styles from './index.module.scss';

export function MovieId() {
  const [isVisible, setIsVisible] = useState(false);
  const { movieItem, movieItems, favoriteItems, error } = useSelector(
    (state: RootState) => state.movieItems
  );
  const { movieId } = useParams<{ movieId: string | undefined }>();
  const dispatch: AppDispatch = useDispatch();
  const cn = createClassName(styles, 'movie-id');
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
    return <EmptyItem />;
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
    <div className={cn()}>
      <div className={cn('preview')}>
        <div className={cn('img-wrapper')}>
          <img className={cn('img')} src={posterUrl} alt={nameRu} />
        </div>
        <div className={cn('buttons')}>
          <button
            className={cn('button', { left: true })}
            type="button"
            onClick={handleClickFavoriteButton}
          >
            <img src={find ? favoritesActive : favorites} alt="" />
          </button>
          <button
            className={cn('button', { right: true })}
            type="button"
            onClick={handleClickShareButton}
          >
            <img src={share} alt="" />
          </button>
          <div className={cn('share')}>
            <ShareButtons title={nameRu} visible={isVisible} />
          </div>
        </div>
      </div>
      <div>
        <div className={cn('tags')}>
          {genres?.map((item, index) => (
            <p key={index}>{item.genre}</p>
          ))}
        </div>
        <div className={cn('title')}>{nameRu}</div>
        <div className={cn('ratings')}>
          {ratingKinopoisk && (
            <a href={webUrl} className={cn('rating', { kinopoisk: true })}>
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
              className={cn('rating', { imdb: true })}
            >
              <img
                className={cn('img-imdb')}
                src={imdb}
                alt=""
              />
              <p>{ratingImdb}</p>
            </a>
          )}
        </div>
        <div className={cn('text')}>{description}</div>
        <div className={cn('list')}>
          <div className={cn('list_col-key')}>
            <p>Год</p>
            <p>Страна</p>
            <p>Время</p>
            <p>{ratingAgeLimits && 'Возраст'}</p>
          </div>
          <div className={cn('list_col-string')}>
            <p>{year}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {countries?.map((item: IMovieCountries, index: number) => (
                <p key={index}>{item.country}</p>
              ))}
            </div>
            <p>{filmLength ?? 'Неизвестно'}</p>
            <p>{ratingAgeLimits && `${ratingAgeLimits.slice(3)} +`}</p>
          </div>
        </div>
        {movieItems.length !== 0 && (
          <>
            <div className={cn('recomendation')}>Recommendations</div>
            <div className={cn('swiper')}>
              <button ref={prevRef} className={cn('arrow', { prev: true })}>
                ←
              </button>
              <button ref={nextRef} className={cn('arrow', { next: true })}>
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
                  if (
                    prevRef.current &&
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
                {movieItems?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <MovieItem movieData={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

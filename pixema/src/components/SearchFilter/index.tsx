import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterItemsThunk } from '@/redux/movie-items-slice';
import { useEffect } from 'react';
import { fetchFiltersThunk } from '@/redux/filters-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { useNavigate } from 'react-router';
import { ISearchFilterFormValues } from './type';

interface SearchFilterProps {
  toggle: boolean; // Типизация пропса toggle
  onClose: () => void;
}

export function SearchFilter({ toggle, onClose }: SearchFilterProps) {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { genres, countries } = useSelector(
    (state: RootState) => state.filters
  );

  const { register, handleSubmit, reset } = useForm<ISearchFilterFormValues>();

  useEffect(() => {
    dispatch(fetchFiltersThunk());
  }, []);

  const onSubmit: SubmitHandler<ISearchFilterFormValues> = (body) => {
    navigate(`/`);
    dispatch(fetchFilterItemsThunk(body));
    onClose();
  };

  const handleClickButtonReset = () => reset();

  return (
    <div className={toggle ? '' : styles['search-filter']}>
      <div className={styles['search-filter__wrapper']}>
        <div className={styles['search-filter__title']}>
          <div>Filters</div>
          <button
            className={styles['search-filter__close-button']}
            type="button"
            onClick={onClose}
          ></button>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['search-filter__sort']}>
            <div className={styles['search-filter__label']}>Sort by</div>

            <div className={styles['search-filter__toggle']}>
              <input
                type="radio"
                id="RATING"
                value="RATING"
                {...register('order')}
              />
              <label
                className={`${styles['search-filter__radiobutton']} ${styles['search-filter__radiobutton_left']}`}
                htmlFor="RATING"
              >
                Rating
              </label>

              <input
                type="radio"
                id="YEAR"
                value="YEAR"
                {...register('order')}
              />
              <label
                className={`${styles['search-filter__radiobutton']} ${styles['search-filter__radiobutton_right']}`}
                htmlFor="YEAR"
              >
                Year
              </label>
            </div>
            <div className={styles['search-filter__line']}></div>
          </div>

          <div className={styles['search-filter__settings']}>
            <div className={styles['search-filter__movie-name']}>
              <div className={styles['search-filter__label']}>
                Full or short movie name
              </div>
              <input
                placeholder="Your text"
                type="text"
                id=""
                {...register('keyword')}
              />
            </div>

            <div className={styles['search-filter__countries']}>
              <div className={styles['search-filter__label']}>Genres</div>
              <select id="" {...register('genres')}>
                {/* <option value=""></option> */}
                {genres.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.genre}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={styles['search-filter__years']}>
              <div className={styles['search-filter__label']}>Years</div>
              <div>
                <input
                  placeholder="From"
                  type="number"
                  id=""
                  {...register('yearFrom')}
                />
                <input
                  placeholder="To"
                  type="number"
                  id=""
                  {...register('yearTo')}
                />
              </div>
            </div>

            <div className={styles['search-filter__years']}>
              <div className={styles['search-filter__label']}>Rating</div>
              <div>
                <input
                  placeholder="From"
                  type="number"
                  id=""
                  {...register('ratingFrom')}
                />
                <input
                  placeholder="To"
                  type="number"
                  id=""
                  {...register('ratingTo')}
                />
              </div>
            </div>

            <div className={styles['search-filter__countries']}>
              <div className={styles['search-filter__label']}>Countries</div>
              <select id="" {...register('countries')}>
                <option value=""></option>

                {countries.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.country}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className={styles['search-filter__buttons']}>
            <button
              className={`${styles['search-filter__button']} ${styles['search-filter__button-clear']} `}
              onClick={handleClickButtonReset}
              type="button"
            >
              Clear filter
            </button>
            <button
              className={`${styles['search-filter__button']} ${styles['search-filter__button-submit']} `}
              type="submit"
            >
              Show results
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

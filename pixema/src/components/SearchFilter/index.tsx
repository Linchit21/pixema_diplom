import { useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterItemsThunk } from '@/redux/movie-items-slice';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { fetchFiltersThunk } from '@/redux/filters-slice';

export function SearchFilter({ visible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { genres, countries } = useSelector((state) => state.filters);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(fetchFiltersThunk());
  }, []);

  const onSubmit = (body) => {
    event.preventDefault();

    // navigate(`/search`);
    dispatch(fetchFilterItemsThunk(body));
    visible = false;
  };

  const handleCliclButtonReset = () => reset();

  return (
    <div className={visible ? '' : styles['search-filter']}>
      <div className={styles['search-filter__wrapper']}>
        <div className={styles['search-filter__title']}>
          <div>Filters</div>
          <button type="button"></button>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['search-filter__sort']}>
            <div className={styles['search-filter__label']}>Sort by</div>

            <div className={styles['search-filter__toggle']}>
              <input
                type="radio"
                id="RATING"
                name="search-name"
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
                name="search-name"
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
                name="search-name"
                id=""
                {...register('keyword')}
              />
            </div>

            <div className={styles['search-filter__countries']}>
              <div className={styles['search-filter__label']}>Genres</div>
              <select name="" id="" {...register('genres')}>
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
                  name="search-name"
                  id=""
                  {...register('yearFrom')}
                />
                <input
                  placeholder="To"
                  type="number"
                  name="search-name"
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
                  name="search-name"
                  id=""
                  {...register('ratingFrom')}
                />
                <input
                  placeholder="To"
                  type="number"
                  name="search-name"
                  id=""
                  {...register('ratingTo')}
                />
              </div>
            </div>

            <div className={styles['search-filter__countries']}>
              <div className={styles['search-filter__label']}>Countries</div>
              <select name="" id="" {...register('countries')}>
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
              onClick={handleCliclButtonReset}
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

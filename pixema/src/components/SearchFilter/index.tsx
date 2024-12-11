import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './index.module.scss';
import { useState } from 'react';

export function SearchFilter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles['search-filter']}>
      <div className={styles['search-filter__title']}>
        <div>Filters</div>
        <button type="button"></button>
      </div>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['search-filter__selectedOption']}>
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

          <div className={styles['search-filter__movie-name']}>
            <div className={styles['search-filter__label']}>Genre</div>
            <input
              placeholder=""
              type="number"
              name="search-name"
              id=""
              {...register('genres')}
            />
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
            <select name="" id="">
              <option value=""></option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
            </select>
          </div>
        </div>

        <div className={styles['search-filter__buttons']}>
          <button
            className={`${styles['search-filter__button']} ${styles['search-filter__button-clear']} `}
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
  );
}

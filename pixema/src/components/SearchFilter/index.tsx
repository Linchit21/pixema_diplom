import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { searchFilters } from '@/redux/movie-items-slice';
import { useEffect } from 'react';
import { fetchFiltersThunk } from '@/redux/filters-slice';
import { AppDispatch, RootState } from '@/redux/store';
import { ISearchFilterFormValues } from './type';
import { createClassName } from '@/utils/className';

import styles from './index.module.scss';

interface SearchFilterProps {
  toggle: boolean; // Типизация пропса toggle
  setVisible: (isVisible: boolean) => void;
}

export function SearchFilter({ toggle, setVisible }: SearchFilterProps) {
  const cn = createClassName(styles, 'search-filter');
  const { search } = useSelector((state: RootState) => state.movieItems);
  const { register, handleSubmit, reset } = useForm<ISearchFilterFormValues>();
  const { genres, countries } = useSelector(
    (state: RootState) => state.filters
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFiltersThunk());
  }, []);

  useEffect(() => {
    if (!Object.keys(search).length) {
      reset();
      setVisible(false);
    }
  }, [search]);

  const onSubmit: SubmitHandler<ISearchFilterFormValues> = (body) => {
    dispatch(searchFilters(body));
    setVisible(false);
  };

  const handleClickButtonReset = () => reset();

  return (
    <div className={toggle ? '' : cn()}>
      <div className={cn('wrapper')}>
        <div className={cn('title')}>
          <div>Filters</div>
          <button
            className={cn('close-button')}
            type="button"
            onClick={() => setVisible(false)}
          ></button>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className={cn('sort')}>
            <div className={cn('label')}>Sort by</div>

            <div className={cn('toggle')}>
              <input
                type="radio"
                id="RATING"
                value="RATING"
                {...register('order')}
              />
              <label
                className={`${cn('radiobutton')} ${cn('radiobutton_left')}`}
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
                className={`${cn('radiobutton')} ${cn('radiobutton_right')}`}
                htmlFor="YEAR"
              >
                Year
              </label>
            </div>
            <div className={cn('line')}></div>
          </div>

          <div className={cn('settings')}>
            <div className={cn('countries')}>
              <div className={cn('label')}>Genres</div>
              <select id="" {...register('genres')}>
                <option value=""></option>
                {genres.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.genre}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={cn('years')}>
              <div className={cn('label')}>Years</div>
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

            <div className={cn('years')}>
              <div className={cn('label')}>Rating</div>
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

            <div className={cn('countries')}>
              <div className={cn('label')}>Countries</div>
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

          <div className={cn('buttons')}>
            <button
              className={`${cn('button')} ${cn('button-clear')}`}
              onClick={handleClickButtonReset}
              type="button"
            >
              Clear filter
            </button>
            <button
              className={`${cn('button')} ${cn('button-submit')}`}
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

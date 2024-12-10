import styles from './index.module.scss';

export function SearchFilter() {
  return (
    <div className={styles['search-filter']}>
      <div className={styles['search-filter__title']}>
        <div>Filters</div>
        <button type="button"></button>
      </div>
      <form action="">
        <div className={styles['search-filter__sort']}>
          <div className={styles['search-filter__label']}>Sort by</div>
          <div className={styles['search-filter__toggle']}>
            <div
              className={`${styles['search-filter__radiobutton']} ${styles['search-filter__radiobutton_left']} `}
            >
              <input type="radio" id="RATING" name="sort" />
              Rating
            </div>
            <div
              className={`${styles['search-filter__radiobutton']} ${styles['search-filter__radiobutton_right']} `}
            >
              <input type="radio" id="YEAR" name="sort" />
              Year
            </div>
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
            />
          </div>
          <div className={styles['search-filter__movie-name']}>
            <div className={styles['search-filter__label']}>Genre</div>
            <input placeholder="" type="text" name="search-name" id="" />
          </div>
          <div className={styles['search-filter__years']}>
            <div className={styles['search-filter__label']}>Years</div>
            <div>
              <input placeholder="From" type="text" name="search-name" id="" />
              <input placeholder="To" type="text" name="search-name" id="" />
            </div>
          </div>
          <div className={styles['search-filter__years']}>
            <div className={styles['search-filter__label']}>Rating</div>
            <div>
              <input placeholder="From" type="text" name="search-name" id="" />
              <input placeholder="To" type="text" name="search-name" id="" />
            </div>
          </div>
          <div className={styles['search-filter__countries']}>
            <div className={styles['search-filter__label']}>Countries</div>
            <select name="" id=""></select>
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
            type="button"
          >
            Show results
          </button>
        </div>
      </form>
    </div>
  );
}

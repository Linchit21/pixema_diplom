import { User } from '@/components/User';
import styles from './index.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '@/redux/movie-items-slice';

export function Header() {
  const { search } = useSelector((state) => state.movieItems);
  const dispatch = useDispatch();
  const [searchItem, setsearchItem] = useState(search || '');

  const handleSubmitForm = (event) => {
    event.preventDefault();

    dispatch(searchItems(searchItem));
  };

  const handleChangeInput = (event) => {
    setsearchItem(event.target.value);
  };

  return (
    <div className={styles.header}>
      <form onSubmit={handleSubmitForm} className={styles.header__form}>
        <input
          className={styles.header__search}
          type="text"
          placeholder="Search"
          onChange={handleChangeInput}
          value={searchItem}
        />
        {/* TODO: Filter */}
        <button type="button" className={styles.header__filter} />
      </form>
      <User />
    </div>
  );
}

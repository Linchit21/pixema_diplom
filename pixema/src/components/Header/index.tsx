import { User } from '@/components/User';
import styles from './index.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export function Header() {
  const [searchItem, setsearchItem] = useState('');
  const navigate = useNavigate();

  const handleSubmitForm = (event) => {
    event.preventDefault();

    navigate(`/search/${searchItem}`);
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

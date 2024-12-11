import { User } from '@/components/User';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { SearchFilter } from '../SearchFilter';

export function Header() {
  //FIXME: при обнове страницы в импуте должно содержаться значение из useParams

  const [searchItem, setSearchItem] = useState('');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = (event) => {
    event.preventDefault();

    navigate(`/search/${searchItem}`);
  };

  const handleChangeInput = (event) => {
    setSearchItem(event.target.value);
  };

  const handleClickFilterButton = () => {
    setVisible(!visible);
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

        <button
          type="button"
          className={styles.header__filter}
          onClick={handleClickFilterButton}
        />
      </form>
      <div className={styles.header__modal}>
        <SearchFilter visible={visible} />
      </div>
      <User />
    </div>
  );
}

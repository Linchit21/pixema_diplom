import { User } from '@/components/User';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SearchFilter } from '../SearchFilter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { setUser } from '@/redux/auth-slice';
import { searchFilters, setBurger } from '@/redux/movie-items-slice';
import { createClassName } from '@/utils/className';

import styles from './index.module.scss';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export function Header() {
  const cn = createClassName(styles, 'header');
  const [searchItem, setSearchItem] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const { burger } = useSelector((state: RootState) => state.movieItems);
  const { search } = useSelector((state: RootState) => state.movieItems);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log('User logged in:', authUser);
      } else {
        navigate('/auth/sign-in');
      }
    });

    return () => unsubscribe(); // очистка слушателя при размонтировании
  }, []);

  useEffect(() => {
    if (!search.keyword) {
      setSearchItem('');
    }
  }, [search]);

  const handleClickBurger = () => {
    dispatch(setBurger(!burger));
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(searchFilters({ keyword: searchItem }));

    navigate(`/search/${searchItem}`);
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  const toggleFilter = () => {
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

        <button
          type="button"
          className={styles.header__filter}
          onClick={toggleFilter}
        />
      </form>

      <div className={styles.header__modal}>
        <SearchFilter toggle={visible} setVisible={setVisible} />
      </div>

      <div className={styles.header__user}>{user ? <User /> : ''}</div>

      <button
        className={cn('burger', {
          open: burger,
        })}
        type="button"
        onClick={handleClickBurger}
      ></button>
    </div>
  );
}

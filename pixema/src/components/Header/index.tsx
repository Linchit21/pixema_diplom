import { User } from '@/components/User';
import styles from './index.module.scss';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { SearchFilter } from '../SearchFilter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchGetCurrentUserThunk } from '@/redux/auth-slice';

export function Header() {
  //FIXME: при обнове страницы в импуте должно содержаться значение из useParams
  const { jwt } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (jwt?.access) {
      dispatch(fetchGetCurrentUserThunk(jwt?.access));
    }
  }, [jwt]);

  const { user } = useSelector((state: RootState) => state.auth);

  const [searchItem, setSearchItem] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
        <SearchFilter toggle={visible} onClose={toggleFilter} />
      </div>
      {user ? <User /> : ''}
    </div>
  );
}

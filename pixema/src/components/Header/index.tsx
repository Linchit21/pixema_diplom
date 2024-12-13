import { User } from '@/components/User';
import styles from './index.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { SearchFilter } from '../SearchFilter';

export function Header() {
  //FIXME: при обнове страницы в импуте должно содержаться значение из useParams

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

        <button
          type="button"
          className={styles.header__filter}
          onClick={handleClickFilterButton}
        />
      </form>
      <div className={styles.header__modal}>
        <SearchFilter toggle={visible} />
      </div>
      <User />
    </div>
  );
}

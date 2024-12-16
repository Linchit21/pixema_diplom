import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import { RootState } from '@/redux/store';

export function User() {
  const { user } = useSelector((state: RootState) => state.auth);

  function firstLetter(item: string) {
    return item.charAt(0).toUpperCase();
  }

  return (
    <div className={styles.user}>
      <div className={styles.user__initials}>{firstLetter(user?.username)}</div>
      <div className={styles.user__name}>{user?.username}</div>
      <button className={styles.user__arrow} type="button"></button>
    </div>
  );
}

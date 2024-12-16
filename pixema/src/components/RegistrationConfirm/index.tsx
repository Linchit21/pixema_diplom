import { MovieItem } from '@/components/MovieItem';
import { IMovieItem } from '@/types/movie/movie';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import styles from './index.module.scss';

export function RegistrationConfirm() {
  const { profile, isLoaded, error } = useSelector(
    (state: RootState) => state.auth
  );

  if (isLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles['registration-confirm']}>
      <div className={styles['registration-confirm__header']}>
        <p className={styles['registration-confirm__back']}>Back</p>
        <h2 className={styles['registration-confirm__title']}>Home</h2>
      </div>
      <div>
        <div className={styles['registration-confirm__block']}>
          <p className={styles['registration-confirm__text']}>
            Please activate your account with the activation link in the email.
            <span> {profile?.email}</span>. <br />
            Please, check your email.
          </p>
          <button className={styles['registration-confirm__submit-button']}>
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
}

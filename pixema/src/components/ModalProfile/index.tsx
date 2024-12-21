import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Input } from '../Input';

export function ModalProfile() {
  // const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className={styles['modal-profile']}>
      <div className={styles['modal-profile__wrapper-name']}>Profile</div>

      <div className={styles['modal-profile__wrapper']}>
        <div className={styles['modal-profile__input']}>
          <Input isDisabled={true} placeholder={user?.username} title="Name" />
        </div>
        <div className={styles['modal-profile__input']}>
          <Input isDisabled={true} placeholder={user?.email} title="Email" />
        </div>
      </div>

      <div className={styles['modal-profile__wrapper-name']}>Password</div>

      <div className={styles['modal-profile__wrapper']}>
        <div className={styles['modal-profile__input']}>
          <Input placeholder="Password" title="Password" />
        </div>
        <div className={styles['modal-profile__item-column']}>
          <Input placeholder="New password" title="New password" />

          <Input placeholder="Confirm password" title="Confirm password" />
        </div>
      </div>

      <div className={styles['modal-profile__wrapper-name']}>Color mode</div>

      <div className={styles['modal-profile__wrapper']}>
        <div>
          <p className={styles['modal-profile__text']}>Dark</p>
          <p className={styles['modal-profile__description']}>Use dark theme</p>
        </div>
        <div className={styles['modal-profile__toggle']}>
          <input type="checkbox" />
          {/* Придумать что делать */}
        </div>
      </div>
    </div>
  );
}

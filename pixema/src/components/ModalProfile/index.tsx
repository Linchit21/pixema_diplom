import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { Input } from '../Input';
import { createClassName } from '@/utils/className';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchSetPasswordThunk } from '@/redux/auth-slice';
import { Switch } from '../Switch';

interface IModalProfileValuesType {
  password: string;
  ['new_password']: string;
  ['confirm_password']?: string;
} //FIXME: вопросики

export function ModalProfile() {
  const { user, error } = useSelector((state: RootState) => state.auth);
  const cn = createClassName(styles, 'modal-profile');
  const { register, handleSubmit, reset } = useForm();
  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<IModalProfileValuesType> = async (
    data: IModalProfileValuesType
  ) => {
    if (data['new_password'] == data['confirm_password']) {
      const body = {
        ['current_password']: data.password,
        ['new_password']: data['new_password'],
      };
      dispatch(fetchSetPasswordThunk(body));
      reset();
    } else {
      console.log(data);
    }
  };

  const handleClickResetButton = () => {
    reset();
  };

  return (
    <form className={styles['modal-profile']} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['modal-profile__wrapper-name']}>Profile</div>

      <div className={styles['modal-profile__wrapper']}>
        <div className={cn('input')}>
          <Input
            type="text"
            isDisabled={true}
            placeholder={user?.username}
            title="Name"
          />
        </div>
        <div className={styles['modal-profile__input']}>
          <Input
            type="text"
            isDisabled={true}
            placeholder={user?.email}
            title="Email"
          />
        </div>
      </div>

      <div className={styles['modal-profile__wrapper-name']}>Password</div>

      <div className={`${cn('wrapper')} ${error && cn('invalid')}`}>
        <div className={styles['modal-profile__input']}>
          <Input
            placeholder="Password"
            title="Password"
            type="password"
            register={register}
            registerName="password"
          />
        </div>
        <div className={styles['modal-profile__item-column']}>
          <Input
            placeholder="New password"
            title="New password"
            type="password"
            register={register}
            registerName="new_password"
          />

          <Input
            placeholder="Confirm password"
            title="Confirm password"
            type="password"
            register={register}
            registerName="confirm_password"
          />
        </div>
      </div>

      <div className={styles['modal-profile__wrapper-name']}>Color mode</div>

      <div className={styles['modal-profile__wrapper']}>
        <div>
          <p className={styles['modal-profile__text']}>Dark</p>
          <p className={styles['modal-profile__description']}>Use dark theme</p>
        </div>
        <div className={styles['modal-profile__toggle']}>
          <Switch />
        </div>
      </div>

      <div className={styles['modal-profile__buttons']}>
        <button
          className={`${cn('button')} ${cn('button_cancel')}`}
          type="button"
          onClick={handleClickResetButton}
        >
          Cancel
        </button>
        <button
          className={`${cn('button')} ${cn('button_save')}`}
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}

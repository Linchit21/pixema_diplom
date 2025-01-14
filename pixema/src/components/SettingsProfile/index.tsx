import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { Input } from '../Input';
import { createClassName } from '@/utils/className';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchSetPasswordThunk } from '@/redux/auth-slice';

import styles from './index.module.scss';

export interface ISettingsProfileValuesType {
  password: number;
  ['new_password']: number;
  ['confirm_password']?: number;
}

export function SettingsProfile() {
  const cn = createClassName(styles, 'modal-profile');
  const { user, error } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit, reset } =
    useForm<ISettingsProfileValuesType>();
  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<ISettingsProfileValuesType> = async (
    data: ISettingsProfileValuesType
  ) => {
    if (data['new_password'] == data['confirm_password']) {
      const body = {
        ['current_password']: data.password,
        ['new_password']: data['new_password'],
      };
      dispatch(fetchSetPasswordThunk(body));
      reset();
    } else {
      return error;
    }
  };

  const handleClickResetButton = () => {
    reset();
  };

  return (
    <form className={cn()} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('wrapper-name')}>Profile</div>

      <div className={cn('wrapper')}>
        <div className={cn('input')}>
          <Input
            type="text"
            isDisabled={true}
            placeholder={user?.username}
            title="Name"
          />
        </div>
        <div className={cn('input')}>
          <Input
            type="text"
            isDisabled={true}
            placeholder={user?.email}
            title="Email"
          />
        </div>
      </div>

      <div className={cn('wrapper-name')}>Password</div>

      <div className={cn('wrapper', { invalid: error })}>
        <div className={cn('input')}>
          <Input
            placeholder="Password"
            title="Password"
            type="password"
            register={register('password')}
          />
        </div>
        <div className={cn('item-column')}>
          <Input
            placeholder="New password"
            title="New password"
            type="password"
            register={register('new_password')}
          />

          <Input
            placeholder="Confirm password"
            title="Confirm password"
            type="password"
            register={register('confirm_password')}
          />
        </div>
      </div>

      <div className={cn('buttons')}>
        <button
          className={cn('button', { cancel: true })}
          type="button"
          onClick={handleClickResetButton}
        >
          Cancel
        </button>
        <button className={cn('button', { save: true })} type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

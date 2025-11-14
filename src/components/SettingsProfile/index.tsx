import { getAuth, updatePassword  } from 'firebase/auth';
import { Input } from '../Input';
import { createClassName } from '@/utils/className';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './index.module.scss';
import { useState } from 'react';

export interface ISettingsProfileValuesType {
  ['new_password']: string;
  ['confirm_password']?: string;
}

export function SettingsProfile() {
  const cn = createClassName(styles, 'modal-profile');
  const { register, handleSubmit, reset } =
    useForm<ISettingsProfileValuesType>();

  const [isError, setIsError] = useState('');

  const auth = getAuth();
  const firebaseUser = auth.currentUser;

  const onSubmit: SubmitHandler<ISettingsProfileValuesType> = async (
    data: ISettingsProfileValuesType
  ) => {
    if (data['new_password'] === data['confirm_password'] && firebaseUser) {
      updatePassword(firebaseUser, data['new_password'])
        .then(() => {
          reset()
          alert('Password has be changed');
        })
        .catch((error) => {
          setIsError(String(error));
          console.log(error)
        });
    } else {
      setIsError('The password does not match');
    }
  };

  const handleClickResetButton = () => {
    reset();
    setIsError('');
  };

  return (
    <form className={cn()} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn('wrapper-name')}>Profile</div>

      <div className={cn('wrapper')}>
        <div className={cn('input')}>
          <Input
            type="text"
            isDisabled={true}
            placeholder={firebaseUser?.displayName ?? undefined}
            title="Name"
          />
        </div>
        <div className={cn('input')}>
          <Input
            type="text"
            isDisabled={true}
            placeholder={firebaseUser?.email ?? undefined}
            title="Email"
          />
        </div>
      </div>

      <div className={cn('wrapper-name')}>Password</div>

      <div className={cn('wrapper', { invalid: isError })}>
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
        {isError && <div className={cn('error')}>{isError}</div>}
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

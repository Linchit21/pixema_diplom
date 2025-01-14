import { FormField } from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { fetchSignInThunk } from '@/redux/auth-slice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { ISignInFormValuesType } from './types';
import { AppDispatch } from '@/redux/store';
import { createClassName } from '@/utils/className';

import styles from './index.module.scss';

export function SignInForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const cn = createClassName(styles, 'sign-in-form');

  const { register, handleSubmit } = useForm<ISignInFormValuesType>({});

  const onSubmit: SubmitHandler<ISignInFormValuesType> = (
    body: ISignInFormValuesType
  ) => {
    const successCallback = () => {
      navigate('/');
    };
    dispatch(fetchSignInThunk({ body, successCallback }));
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>Sign In</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn('form-fields')}>
          <FormField
            label="Email"
            type="email"
            {...register('email', { required: true })}
          />

          <FormField
            passwordToggle={true}
            label="Password"
            type="password"
            {...register('password', { required: true })}
          />
        </div>

        <button type="submit" className={cn('submit-button')}>
          Sign In
        </button>
        <p className={cn('hint')}>
          Don’t have an account?{' '}
          <NavLink className={cn('sign-in-link')} to={'/auth/sign-up'}>
            Sign Up
          </NavLink>
        </p>
      </form>
    </div>
  );
}

import { FormField } from '@/components/FormField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { ISignInFormValuesType } from './types';
import { createClassName } from '@/utils/className';

import styles from './index.module.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export function SignInForm() {
  const navigate = useNavigate();
  const cn = createClassName(styles, 'sign-in-form');

  const { register, handleSubmit } = useForm<ISignInFormValuesType>({});

  const onSubmit: SubmitHandler<ISignInFormValuesType> = async ({
    email,
    password,
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      // Здесь можно обработать ошибку, например, показать уведомление пользователю
      // dispatch(showErrorNotification('Failed to sign in. Please try again.'));
      //TODO: обработка ошибок, если нужно
    }
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

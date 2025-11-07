import { FormField } from '@/components/FormField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { ISignInFormValuesType } from './types';
import { createClassName } from '@/utils/className';

import styles from './index.module.scss';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { SocialSignup } from '../SocialSignUp/SocialSignUp';
import { useEffect, useState } from 'react';

export function SignInForm() {
  const navigate = useNavigate();
  const cn = createClassName(styles, 'sign-in-form');
  const [authError, setAuthError] = useState<string | null>(null);
  const { register, handleSubmit, setFocus } = useForm<ISignInFormValuesType>(
    {}
  );

  useEffect(() => {
    setFocus('email');

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate, setFocus]);

  const onSubmit: SubmitHandler<ISignInFormValuesType> = async ({
    email,
    password,
  }) => {
    setAuthError(null);
    
    if (!email || !password) {
      setAuthError('All fields must be filled');
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (error) {
        console.error('Error signing in:', error);
        setAuthError('Invalid email or password');
      }
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>Sign In</div>
      <div
        className={`${cn('error')} ${authError ? cn('invalid') : cn('valid')}`}
      >
        {authError}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn('form-fields')}>
          <FormField label="Email" type="email" {...register('email')} />

          <FormField
            passwordToggle={true}
            label="Password"
            type="password"
            {...register('password')}
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
        <SocialSignup />
      </form>
    </div>
  );
}

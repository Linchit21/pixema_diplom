import { useEffect, useRef, useState } from 'react';
import { FormField } from '@/components/FormField';
import { FormFieldElement } from '@/components/FormField/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { ISignUpFormValuesType } from './types';
import { createClassName } from '@/utils/className';

import styles from './index.module.scss';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export function SignUpForm() {
  const navigate = useNavigate();
  const cn = createClassName(styles, 'sign-up-form');
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setFocus,
  } = useForm<ISignUpFormValuesType>();

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  const onSubmit: SubmitHandler<ISignUpFormValuesType> = async (body) => {
    setAuthError(null);

    if (
      !body.username ||
      !body.email ||
      !body.password ||
      !body['confirm password']
    ) {
      setAuthError('Please fill in all fields');
      return;
    }

    // Проверка совпадения паролей
    if (body.password !== body['confirm password']) {
      setAuthError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );

      await updateProfile(userCredential.user, {
        displayName: body.username,
      });

      navigate('/');
    } catch (error: any) {
      console.log('Registration error:', error);
      setAuthError(error.message); // сообщение от Firebase
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>Sign Up</div>
      <div
        className={`${cn('error')} ${authError ? cn('invalid') : cn('valid')}`}
      >
        {authError}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={cn('form')}>
        <div className={cn('logo')}></div>
        <div className={cn('form-fields')}>
          <FormField
            label="Username"
            {...register('username')}
          />

          <FormField
            label="Email"
            type="email"
            {...register('email')}
          />

          <FormField
            passwordToggle={true}
            label="Password"
            type="password"
            {...register('password')}
          />

          <FormField
            passwordToggle={true}
            label="Confirm password"
            type="password"
            {...register('confirm password')}
          />
        </div>

        <button type="submit" className={cn('submit-button')}>
          Sign Up
        </button>
        <p className={cn('hint')}>
          You already have an account?{' '}
          <NavLink className={cn('sign-in-link')} to={'/auth/sign-in'}>
            Sign In
          </NavLink>
        </p>
      </form>
    </div>
  );
}

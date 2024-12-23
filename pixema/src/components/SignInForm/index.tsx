import { useEffect, useRef } from 'react';
import { FormField } from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { fetchSignInThunk } from '@/redux/auth-slice';

import styles from './index.module.scss';
import { FormFieldElement } from '@/components/FormField/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { ISignInFormValuesType } from './types';
import { AppDispatch } from '@/redux/store';

export function SignInForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ISignInFormValuesType>({
    defaultValues: {
      email: 'linchest21@gmail.com',
      password: '123123Qw',
    },
  });

  const onSubmit: SubmitHandler<ISignInFormValuesType> = (
    body: ISignInFormValuesType
  ) => {
    const successCallback = () => {
      navigate('/');
    };

    dispatch(fetchSignInThunk({ body, successCallback }));
  };

  const emailRef = useRef<FormFieldElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <div className={styles['sign-in-form']}>
      <div className={styles['sign-in-form__title']}>Sign In</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['sign-in-form__form-fields']}>
          <FormField
            label="Email"
            type="email"
            {...register('email', { required: true })}
            ref={emailRef}
          />

          <FormField
            passwordToggle={true}
            label="Password"
            type="password"
            {...register('password', { required: true })}
          />
        </div>

        <button type="submit" className={styles['sign-in-form__submit-button']}>
          Sign In
        </button>
        <p className={styles['sign-in-form__hint']}>
          Don’t have an account?
          <NavLink
            className={styles['sign-in-form__sign-in-link']}
            to={'/auth/sign-up'}
          >
            Sign Up
          </NavLink>
        </p>
      </form>
    </div>
  );
}

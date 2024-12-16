import React, { useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { FormField } from '@/components/FormField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignInThunk, fetchSignUpThunk } from '@/redux/auth-slice';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';
import { FormFieldElement } from '@/components/FormField/types';
import { useForm } from 'react-hook-form';
import { RootState } from '@/redux/store';

export function SignInForm() {
  const { jwt } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FilterFormValues>();

  const onSubmit: SubmitHandler<FilterFormValues> = (body) => {
    event.preventDefault();

    dispatch(fetchSignInThunk(body));
    console.log(body);
  };

  console.log(jwt);

  const emailRef = useRef<FormFieldElement>(null);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <div className={styles['sign-in-form']}>
      <div className={styles['sign-in-form__header']}>
        <h2 className={styles['sign-in-form__title']}>Sign In</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles['sign-in-form__form']}
      >
        <div className={styles['sign-in-form__logo']}></div>
        <div className={styles['sign-in-form__form-fields']}>
          <FormField
            ref={emailRef}
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

        <button type="submit" className={styles['sign-in-form__submit-button']}>
          SignIn
        </button>
        <p className={styles['sign-in-form__hint']}>
          You don't have account?
          <a href="#" className={styles['sign-in-form__sign-in-link']}>
            SignUp
          </a>
        </p>
      </form>
    </div>
  );
}

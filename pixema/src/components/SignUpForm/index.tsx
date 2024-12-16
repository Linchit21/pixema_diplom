import React, { useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { FormField } from '@/components/FormField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignUpThunk } from '@/redux/auth-slice';

import styles from './index.module.scss';
import { FormFieldElement } from '@/components/FormField/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FilterFormValues>();

  const onSubmit: SubmitHandler<FilterFormValues> = (body) => {
    event.preventDefault();

    if (body.password === body['confirm password']) {
      dispatch(fetchSignUpThunk(body));
      navigate('/auth/activation/');
    }
  };

  const emailRef = useRef<FormFieldElement>(null);

  const renderAlert = () => {
    if (Object.keys(errors).length) {
      return (
        <div className="alert alert-danger">The form has empty fields!</div>
      );
    }

    return null;
  };

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <div className={styles['sign-up-form']}>
      {renderAlert()}

      <div className={styles['sign-up-form__header']}>
        <h2 className={styles['sign-up-form__title']}>Registration</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles['sign-up-form__form']}
      >
        <div className={styles['sign-up-form__logo']}></div>
        <div className={styles['sign-up-form__form-fields']}>
          <FormField
            label="Username"
            {...register('username', {
              required: true,
            })}
          />

          <FormField
            ref={emailRef}
            label="Email"
            type="email"
            {...register('email', {
              required: true,
            })}
          />

          <FormField
            passwordToggle={true}
            label="Password"
            type="password"
            {...register('password', {
              required: true,
            })}
          />

          <FormField
            passwordToggle={true}
            label="Confirm password"
            type="password"
            {...register('confirm password', {
              required: true,
            })}
          />
        </div>

        <button type="submit" className={styles['sign-up-form__submit-button']}>
          SignUp
        </button>
        <p className={styles['sign-up-form__hint']}>
          You alredy have account?
          <a href="#" className={styles['sign-up-form__sign-in-link']}>
            SignIn
          </a>
        </p>
      </form>
    </div>
  );
}

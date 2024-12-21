import { useEffect, useRef } from 'react';
import { FormField } from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { fetchSignInThunk } from '@/redux/auth-slice';

import styles from './index.module.scss';
import { FormFieldElement } from '@/components/FormField/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { SignInFormValuesType } from './types';
import { AppDispatch } from '@/redux/store';

export function SignInForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignInFormValuesType>({
    defaultValues: {
      email: 'linchest21@gmail.com',
      password: '123123Qw',
    },
  });

  const onSubmit: SubmitHandler<SignInFormValuesType> = (
    body: SignInFormValuesType
  ) => {
    console.log(body);
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

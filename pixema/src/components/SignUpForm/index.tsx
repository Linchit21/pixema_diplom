import { useEffect, useRef } from 'react';
import { FormField } from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { fetchSignUpThunk } from '@/redux/auth-slice';

import styles from './index.module.scss';
import { FormFieldElement } from '@/components/FormField/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { ISignUpFormValuesType } from './types';
import { AppDispatch } from '@/redux/store';

export function SignUpForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormValuesType>();

  const onSubmit: SubmitHandler<ISignUpFormValuesType> = (body) => {
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
      <div className={styles['sign-up-form__title']}>Sign Up</div>

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
            label="Email"
            type="email"
            {...register('email', {
              required: true,
            })}
            ref={emailRef}
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
          <NavLink
            className={styles['sign-up-form__sign-in-link']}
            to={'/auth/sign-in'}
          >
            Sign In
          </NavLink>
        </p>
      </form>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { FormField } from '@/components/FormField';
import { useDispatch } from 'react-redux';
import { fetchSignUpThunk } from '@/redux/auth-slice';
import { FormFieldElement } from '@/components/FormField/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { ISignUpFormValuesType } from './types';
import { AppDispatch } from '@/redux/store';

import styles from './index.module.scss';
import { createClassName } from '@/utils/className';

export function SignUpForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const cn = createClassName(styles, 'sign-up-form');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormValuesType>();

  const onSubmit: SubmitHandler<ISignUpFormValuesType> = (body) => {
    if (body.password === body['confirm password']) {
      dispatch(fetchSignUpThunk(body));
      navigate('/auth/email');
    }
    console.log(body);
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
  console.log(errors);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <div className={cn()}>
      {renderAlert()}
      <div className={cn('title')}>Sign Up</div>

      <form onSubmit={handleSubmit(onSubmit)} className={cn('form')}>
        <div className={cn('logo')}></div>
        <div className={cn('form-fields')}>
          <FormField
            label="Username"
            {...register('username', { required: true })}
          />

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

          <FormField
            passwordToggle={true}
            label="Confirm password"
            type="password"
            {...register('confirm password', { required: true })}
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

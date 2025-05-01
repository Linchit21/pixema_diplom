import { useEffect, useRef } from 'react';
import { FormField } from '@/components/FormField';
import { FormFieldElement } from '@/components/FormField/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import { ISignUpFormValuesType } from './types';
import { createClassName } from '@/utils/className';

import styles from './index.module.scss';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export function SignUpForm() {
  // const dispatch: AppDispatch = useDispatch();
  // const navigate = useNavigate();
  const cn = createClassName(styles, 'sign-up-form');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormValuesType>();

  const onSubmit: SubmitHandler<ISignUpFormValuesType> = async (body) => {
    if (body.password === body['confirm password']) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          body.email,
          body.password
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: body.username,
        });
      } catch (error) {
        console.log('Registration error:', error);
      }
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

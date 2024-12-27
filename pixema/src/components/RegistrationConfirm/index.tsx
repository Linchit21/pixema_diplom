import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { createClassName } from '@/utils/className';

import styles from './index.module.scss';
import { NavLink } from 'react-router';

export function RegistrationConfirm() {
  const cn = createClassName(styles, 'registration-confirm');
  const { profile, isLoaded, error } = useSelector(
    (state: RootState) => state.auth
  );

  if (isLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={cn()}>
      <div>
        <div className={cn('block')}>
          <p className={cn('text')}>
            Please activate your account with the activation link in the email
            <span> {profile?.email}</span>. <br />
            Please, check your email.
          </p>
          <NavLink className={cn('sign-in-link')} to={'/auth/sign-in'}>
            Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
}

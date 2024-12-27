import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { createClassName } from '@/utils/className';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { logOut } from '@/redux/auth-slice';

import styles from './index.module.scss';

export function User() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const cn = createClassName(styles, 'user');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  function firstLetter(item: string = '') {
    return item.charAt(0).toUpperCase();
  }

  const handleClickOpenMenu = () => {
    setIsOpened(!isOpened);
  };

  const menuItems = [
    {
      text: 'Edit profile',
      onClick: () => {
        navigate('/settings');
      },
    },
    {
      text: 'Log Out',
      onClick: () => {
        dispatch(logOut());
        navigate('/auth/sign-in');
      },
      isLogOut: true,
    },
  ];

  return (
    <div className={cn()}>
      <div className={styles.user__initials}>{firstLetter(user?.username)}</div>
      <div className={styles.user__name}>{user?.username}</div>
      <button
        className={styles.user__arrow}
        type="button"
        onClick={handleClickOpenMenu}
      ></button>
      <div className={cn('menu', { visible: isOpened })}>
        {menuItems.map((item, index) => {
          return (
            <button
              type="button"
              key={index}
              className={cn('menu-item', {
                logout: item.isLogOut,
              })}
              onClick={() => {
                item.onClick();
                setIsOpened(false);
              }}
            >
              {item.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}

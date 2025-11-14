import { createClassName } from '@/utils/className';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { auth, signOut } from '@/firebaseConfig';
import userIcon from '../../../public/img/user.png'
import styles from './index.module.scss';

export function User() {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const cn = createClassName(styles, 'user');
  const navigate = useNavigate();

  const user = auth.currentUser;

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
        signOut(auth);
        navigate('/auth/sign-in');
      },
      isLogOut: true,
    },
  ];

  return (
    <div className={cn()}>
      <div className={styles.user__initials}>
        <img src={user?.photoURL ? user.photoURL : userIcon} alt="" />
      </div>
      <div className={styles.user__name}>{user?.displayName}</div>
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

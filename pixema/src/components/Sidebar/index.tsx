import { SidebarNavigation } from '@/components/Sidebar/constants';
import styles from './index.module.scss';
import { NavLink, useMatch, useResolvedPath } from 'react-router';
import { createClassName } from '@/utils/className';

export function Sidebar() {
  const cn = createClassName(styles, 'sidebar');

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}></div>
      <ul className={styles.sidebar__nav}>
        {SidebarNavigation.map((item, index) => {
          let isActive = !!useMatch({
            path: useResolvedPath(item.path).pathname,
            end: true,
          });

          return (
            <NavLink
              to={item.path}
              key={index}
              className={cn('item', { active: !!isActive })}
            >
              <img
                className={styles['sidebar__item-icon']}
                src={isActive ? item.activeIcon : item.icon}
                alt={item.title}
              />
              <span className={styles['sidebar__item-title']}>
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </ul>
      <div className={styles.sidebar__footer}>© All Rights Reserved</div>
    </div>
  );
}

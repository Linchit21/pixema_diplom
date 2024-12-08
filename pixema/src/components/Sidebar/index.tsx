import { SidebarNavigation } from '@/components/Sidebar/constants';
import styles from './index.module.scss';
import { NavLink } from 'react-router';

export function Sidebar() {
  // const classNav = (linkProps) => {
  //   const { isActive } = linkProps;
  //   return isActive ? styles['sidebar__item_active'] : styles.sidebar__item;
  // };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}></div>
      <ul className={styles.sidebar__nav}>
        {SidebarNavigation.map((item, index) => {
          return (
            <NavLink
              to={item.path}
              key={index}
              className={styles.sidebar__item}
            >
              <img
                className={styles['sidebar__item-icon']}
                src={item.icon}
                alt={item.title}
              />
              <span className={styles['sidebar__item-title']}>
                {item.title}
              </span>
            </NavLink>
            // <li key={index} className={styles.sidebar__item}>
            //   <img
            //     className={styles["sidebar__item-icon"]}
            //     src={item.icon}
            //     alt={item.title}
            //   />
            //   <span className={styles["sidebar__item-title"]}>
            //     {item.title}
            //   </span>
            // </li>
          );
        })}
      </ul>
      <div className={styles.sidebar__footer}>© All Rights Reserved</div>
    </div>
  );
}

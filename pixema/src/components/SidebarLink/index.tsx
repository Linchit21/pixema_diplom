import { ISidebarNavigationItem } from '@/components/Sidebar/constants';
import styles from '@components/Sidebar/index.module.scss';
import { NavLink, useMatch, useResolvedPath } from 'react-router';
import { createClassName } from '@/utils/className';

interface SidebarLinkProps {
  item: ISidebarNavigationItem;
}

export function SidebarLink({ item }: SidebarLinkProps) {
  const cn = createClassName(styles, 'sidebar');

  const isActive = !!useMatch({
    path: useResolvedPath(item.path).pathname,
    end: true,
  });

  return (
    <NavLink to={item.path} className={cn('item', { active: !!isActive })}>
      <img
        className={styles['sidebar__item-icon']}
        src={isActive ? item.activeIcon : item.icon}
        alt={item.title}
      />
      <span className={styles['sidebar__item-title']}>{item.title}</span>
    </NavLink>
  );
}

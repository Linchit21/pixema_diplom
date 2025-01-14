import { ISidebarNavigationItem } from '@/components/Sidebar/constants';
import { NavLink, useMatch, useResolvedPath } from 'react-router';
import { createClassName } from '@/utils/className';

import styles from '@components/Sidebar/index.module.scss';

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
        className={cn('item-icon')}
        src={isActive ? item.activeIcon : item.icon}
        alt={item.title}
      />
      <span className={cn('item-title')}>{item.title}</span>
    </NavLink>
  );
}

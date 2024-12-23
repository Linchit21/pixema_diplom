import { SidebarNavigation } from '@/components/Sidebar/constants';
import { SidebarLink } from '../SidebarLink';
import { createClassName } from '@/utils/className';

import styles from './index.module.scss';

export function Sidebar() {
  const cn = createClassName(styles, 'sidebar');

  return (
    <div className={cn()}>
      <div className={cn('logo')}></div>
      <ul className={cn('nav')}>
        {SidebarNavigation.map((item) => {
          return <SidebarLink item={item} key={item.path} />;
        })}
      </ul>
      <div className={cn('footer')}>© All Rights Reserved</div>
    </div>
  );
}

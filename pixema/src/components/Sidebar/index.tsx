import { SidebarNavigation } from '@/components/Sidebar/constants';
import { SidebarLink } from '../SidebarLink';
import { createClassName } from '@/utils/className';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { User } from '../User';

import styles from './index.module.scss';

export function Sidebar() {
  const cn = createClassName(styles, 'sidebar');
  const { burger } = useSelector((state: RootState) => state.movieItems);

  return (
    <div className={cn('', { open: burger })}>
      <div className={cn('logo')}></div>
      <ul className={cn('nav')}>
        <div className={cn('user')}>
          <User />
        </div>
        {SidebarNavigation.map((item) => {
          return <SidebarLink item={item} key={item.path} />;
        })}
      </ul>
      <div className={cn('footer')}>© All Rights Reserved</div>
    </div>
  );
}

import { Outlet } from 'react-router';
import { createClassName } from '@/utils/className';
import styles from './index.module.scss';
import { Main } from '../Main';

export function UnauthorizedLayout() {
  const cn = createClassName(styles, 'unauthorized-layout');
  return (
    <div className={cn()}>
      <div className={cn('main')}>
        <Outlet />
      </div>
    </div>
  );
}

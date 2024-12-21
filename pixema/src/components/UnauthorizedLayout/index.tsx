import { Container } from '@components/Container';
import { Outlet } from 'react-router';
import { createClassName } from '@/utils/className';
import styles from './index.module.scss';

export function UnauthorizedLayout() {
  const cn = createClassName(styles, 'unauthorized-layout');
  return (
    <div className={cn()}>
      <div></div>
      <Outlet />
    </div>
  );
}

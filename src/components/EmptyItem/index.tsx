import { createClassName } from '@/utils/className';
import empty from '/img/empty.png'

import styles from './index.module.scss';

export function EmptyItem() {
  const cn = createClassName(styles, 'empty-item');

  return (
    <div className={cn()}>
      <div className={cn('img')}>
        <img src={empty} alt="empty" />
      </div>
      <p>Empty state text</p>
    </div>
  );
}

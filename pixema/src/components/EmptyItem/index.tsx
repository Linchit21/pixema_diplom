import { createClassName } from '@/utils/className';

import styles from './index.module.scss';

export function EmptyItem() {
  const cn = createClassName(styles, 'empty-item');

  return (
    <div className={cn()}>
      <div className={cn('img')}>
        <img src="/public/img/empty.png" alt="" />
      </div>
      <p>Empty state text</p>
    </div>
  );
}

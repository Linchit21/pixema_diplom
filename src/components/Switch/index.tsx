import { createClassName } from '@/utils/className';

import styles from './index.module.scss';

export function Switch() {
  const cn = createClassName(styles, 'switch');

  return (
    <div>
      <label className={cn()}>
        <input className={cn('input')} type="checkbox" />
        <span className={`${cn('round')} ${cn('slider')}`}></span>
      </label>
    </div>
  );
}

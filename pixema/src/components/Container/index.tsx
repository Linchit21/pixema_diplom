import { ReactElement } from 'react';
import styles from './index.module.scss';

export function Container(props: { children: ReactElement }) {
  return <div className={styles.container}>{props.children}</div>;
}

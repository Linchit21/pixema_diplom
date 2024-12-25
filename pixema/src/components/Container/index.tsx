import { ReactElement } from 'react';
import styles from './index.module.scss';

export function Container(props: { children: ReactElement }) {
  return (
    <div className={styles.container}>
      {/* <div className={styles.container__loadbar}></div> //TODO: load fetch */}
      {props.children}
    </div>
  );
}

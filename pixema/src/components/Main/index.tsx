import { Header } from '@/components/Header';
import styles from './index.module.scss';
import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <div className={styles.main}>
      <Header />
      {children}
    </div>
  );
}

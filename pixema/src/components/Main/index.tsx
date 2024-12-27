import { Header } from '@/components/Header';
import styles from './index.module.scss';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { createClassName } from '@/utils/className';

interface MainProps {
  children: ReactNode;
}

export function Main({ children }: MainProps) {
  const cn = createClassName(styles, 'main');
  const { burger } = useSelector((state: RootState) => state.movieItems);

  return (
    <div className={cn('', { open: burger })}>
      <Header />
      {children}
    </div>
  );
}

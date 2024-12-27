import { createClassName } from '@/utils/className';
import styles from './index.module.scss';
import { useNavigate } from 'react-router';

export function ErrorActivation() {
  const cn = createClassName(styles, 'activation-error');
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate('/auth/sign-up');
  };

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Ошибка</h2>
      <p className={cn('message')}>Повторите еще раз</p>
      <button className={cn('retry-button')} onClick={handleClickButton}>
        Retry Activation
      </button>
    </div>
  );
}

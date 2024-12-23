import { createClassName } from '@/utils/className';
import styles from './index.module.scss';

interface InputProps {
  placeholder?: string;
  type: string;
  title?: string;
  isDisabled?: boolean;
  register?: (name: string) => {};
  registerName?: string;
}

export function Input({
  placeholder,
  type,
  title,
  isDisabled = false,
  registerName,
  register,
}: InputProps) {
  const cn = createClassName(styles, 'input');

  return (
    <label className={cn('label')}>
      <span>{title}</span>
      <input
        type={type}
        disabled={isDisabled}
        className={cn()}
        placeholder={placeholder}
        {...(register && registerName ? register(registerName) : {})} //FIXME: Рефакторинг
      />
    </label>
  );
}

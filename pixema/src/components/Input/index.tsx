import { createClassName } from '@/utils/className';
import { ISettingsProfileValuesType } from '../SettingsProfile';
import { UseFormRegister } from 'react-hook-form';

import styles from './index.module.scss';

interface InputProps {
  placeholder?: string;
  type: string;
  title?: string;
  isDisabled?: boolean;
  register?: ReturnType<UseFormRegister<ISettingsProfileValuesType>>;
}

export function Input({
  placeholder,
  type,
  title,
  isDisabled = false,
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
        {...register}
      />
    </label>
  );
}

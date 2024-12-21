import styles from './index.module.scss';

interface InputProps {
  placeholder?: string;
  title?: string;
  isDisabled?: boolean;
}

export function Input({ placeholder, title, isDisabled = false }: InputProps) {
  return (
    <label className={styles['input__label']}>
      <span>{title}</span>
      <input
        disabled={isDisabled}
        className={styles['input']}
        placeholder={placeholder}
      />
    </label>
  );
}

import { ChangeEvent, InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number | string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  placeholder?: string;
}

const Input = ({ value, onChange, placeholder, id, ...rest }: InputProps) => {
  return (
    <label htmlFor={id}>
      {placeholder && <span className={styles.placeholder}>{placeholder}</span>}
      <input
        className={styles.input}
        id={id}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </label>
  );
};

export default Input;

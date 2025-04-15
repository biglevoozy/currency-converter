import { ChangeEvent, InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number | string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const Input = ({ value, onChange, id, ...rest }: InputProps) => {
  return (
    <>
      <label htmlFor={id}></label>
      <input
        className={styles.input}
        id={id}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </>
  );
};

export default Input;

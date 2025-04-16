import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const Button = ({
  icon,
  text,
  onClick,
  active = false,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${active ? styles.active : ''}`}
      onClick={onClick}
      {...rest}
    >
      {icon || text}
    </button>
  );
};

export default Button;

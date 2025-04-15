import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  onClick: () => void;
}

const Button = ({ icon, onClick, ...rest }: ButtonProps) => {
  return (
    <button className={styles.btn} onClick={onClick} {...rest}>
      {icon}
    </button>
  );
};

export default Button;

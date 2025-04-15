import { ChangeEvent, SelectHTMLAttributes } from 'react';

import styles from './Select.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  exchangeCurrencies: string[];
  disabledCurrency: string;
}

const Select = ({
  value,
  id,
  onChange,
  exchangeCurrencies,
  disabledCurrency,
}: SelectProps) => {
  return (
    <>
      <label className={styles.label} htmlFor={id}></label>
      <select
        className={styles.select}
        value={value}
        name={id}
        id={id}
        onChange={onChange}
      >
        {exchangeCurrencies.map((currency, index) => (
          <option
            key={index}
            value={currency.toLowerCase()}
            disabled={currency.toLowerCase() === disabledCurrency.toLowerCase()}
          >
            {currency.toUpperCase()}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;

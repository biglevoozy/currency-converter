import { ChangeEvent, SelectHTMLAttributes, useState } from 'react';

import styles from './Select.module.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  exchangeCurrencies: [string, string][];
  disabledCurrency: string;
}

const Select = ({
  value,
  id,
  onChange,
  exchangeCurrencies,
  disabledCurrency,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const className = isOpen ? 'label-opened' : 'label';

  return Object.values(exchangeCurrencies).length > 0 ? (
    <>
      <label className={styles[className]} htmlFor={id}>
        <select
          className={styles.select}
          value={value}
          name={id}
          id={id}
          onChange={onChange}
          onMouseDown={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        >
          {exchangeCurrencies.map((currency) => (
            <option
              key={currency[0]}
              value={currency[0].toLowerCase()}
              disabled={
                currency[0].toLowerCase() === disabledCurrency.toLowerCase()
              }
            >
              {currency[0].toUpperCase()}
            </option>
          ))}
        </select>
      </label>
    </>
  ) : (
    ''
  );
};

export default Select;

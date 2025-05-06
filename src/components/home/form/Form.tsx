import { ChangeEvent, useEffect, useState } from 'react';
import { api } from 'src/api/api';
import Button from 'src/components/ui/Button/Button';
import Input from 'src/components/ui/Input/Input';
import Select from 'src/components/ui/Select/Select';
import { FormValues } from 'src/types/form.interface';

import SwapIcon from './arrowSwap.svg?react';

import styles from './Form.module.css';

interface FormProps {
  formValues: FormValues;
  exchangeRate: number;
  onChange: (name: string, value: string) => void;
  handleSwapCurrencies: () => void;
}

const Form = ({
  formValues,
  exchangeRate,
  onChange,
  handleSwapCurrencies,
}: FormProps) => {
  const convertedValue = exchangeRate
    ? (formValues?.billsQuantity * exchangeRate).toFixed(2)
    : 0;

  const [exchangeCurrencies, setExchangeCurrencies] = useState<
    [string, string][]
  >([]);

  useEffect(() => {
    api.getAvailableCurrencies().then((data) => {
      if (typeof data !== 'undefined') {
        setExchangeCurrencies(data);
      }
    });
  }, []);

  const handleChange = (
    name: string,
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    onChange(name, e.target.value);
  };

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <Input
          id="billsQuantity"
          value={formValues.billsQuantity || 0}
          onChange={(e) => handleChange('billsQuantity', e)}
          type="number"
          placeholder="Enter amount"
        />

        <Select
          value={formValues.fromCurrency}
          id="fromCurrency"
          disabledCurrency={formValues.toCurrency}
          onChange={(e) => handleChange('fromCurrency', e)}
          exchangeCurrencies={exchangeCurrencies}
        />
      </div>

      <div className={styles.swapBtn}>
        <Button
          icon={<SwapIcon />}
          onClick={handleSwapCurrencies}
          type="button"
        />
      </div>

      <div className={styles.row}>
        <Input
          value={convertedValue}
          id="convertedValue"
          disabled
          type="number"
          placeholder="Converted amount"
        />

        <Select
          value={formValues.toCurrency}
          id="toCurrency"
          onChange={(e) => handleChange('toCurrency', e)}
          disabledCurrency={formValues.fromCurrency}
          exchangeCurrencies={exchangeCurrencies}
        />
      </div>
    </form>
  );
};

export default Form;

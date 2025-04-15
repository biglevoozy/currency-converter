import { ChangeEvent } from 'react';
import Button from 'src/components/ui/Button/Button';
import Input from 'src/components/ui/Input/Input';
import Select from 'src/components/ui/Select/Select';
import { FormValues } from 'src/types/form.interface';

import SwapIcon from './arrowSwap.svg?react';

import styles from './Form.module.css';

const EXCHANGE_CURRENCIES = ['eur', 'mdl', 'usd', 'rub'];

interface FormProps {
  formValues: FormValues;
  onChange: (name: string, value: string) => void;
  handleSwapCurrencies: () => void;
}

const Form = ({ formValues, onChange, handleSwapCurrencies }: FormProps) => {
  const convertedValue = (
    formValues.billsQuantity * formValues.exchangeRate
  ).toFixed(2);

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
          value={formValues.billsQuantity}
          onChange={(e) => handleChange('billsQuantity', e)}
          type="number"
        />

        <Select
          value={formValues.fromCurrency}
          id="fromCurrency"
          disabledCurrency={formValues.toCurrency}
          onChange={(e) => handleChange('fromCurrency', e)}
          exchangeCurrencies={EXCHANGE_CURRENCIES}
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
        />
        <Select
          value={formValues.toCurrency}
          id="toCurrency"
          onChange={(e) => handleChange('toCurrency', e)}
          disabledCurrency={formValues.fromCurrency}
          exchangeCurrencies={EXCHANGE_CURRENCIES}
        />
      </div>
    </form>
  );
};

export default Form;

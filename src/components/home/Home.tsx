import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { api } from 'src/api/api';
import { FormValues } from 'src/types/form.interface';
import { getPreviousDays } from 'src/utils/date';

import Heading from '../ui/Heading/Heading';

import Form from './form/Form';
import RatesTable from './ratesTable/RatesTable';

import styles from './Home.module.css';

const PREVIOUS_DAYS = getPreviousDays(10, 0);

interface Rates {
  date: string;
  rate: number;
  from: string;
  to: string;
}

const Home = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    fromCurrency: 'usd',
    toCurrency: 'eur',
    billsQuantity: 100,
    exchangeRate: 0,
  });

  const handleChangeFormValues = (name: string, value: string | number) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [ratesList, setRatesList] = useState<Rates[]>([]);

  useEffect(() => {
    Promise.allSettled(
      PREVIOUS_DAYS.map((day) => api.get(day, formValues.fromCurrency)),
    ).then((rawData) => {
      const formedData = rawData.reduce<Rates[]>((acc, dayRate) => {
        if (dayRate.status === 'fulfilled' && dayRate.value) {
          acc.push({
            date: dayRate.value.date,
            rate: dayRate.value[formValues.fromCurrency][formValues.toCurrency],
            from: formValues.fromCurrency,
            to: formValues.toCurrency,
          });
        }
        return acc;
      }, []);

      handleChangeFormValues('exchangeRate', formedData[0].rate);
      setRatesList(formedData);
    });
  }, [formValues.fromCurrency, formValues.toCurrency]);

  const handleSwapCurrencies = useCallback(() => {
    setRatesList((ratesList) =>
      ratesList.map((item) => ({
        date: item.date,
        rate: 1 / item.rate,
        from: formValues.toCurrency,
        to: formValues.fromCurrency,
      })),
    );

    setFormValues((prevState) => ({
      ...prevState,
      exchangeRate: 1 / prevState.exchangeRate,
      fromCurrency: prevState.toCurrency,
      toCurrency: prevState.fromCurrency,
    }));
  }, [formValues.fromCurrency, formValues.toCurrency]);

  return (
    <div className={styles.wrapper}>
      <Heading headingTag="h1" text="Currency converter" />
      <div className={styles.exchange__wrapper}>
        <div>
          <p className={styles.currentExchangeRate}>
            1 {formValues.fromCurrency.toUpperCase()} equals to{' '}
            {formValues.exchangeRate.toFixed(2)}{' '}
            {formValues.toCurrency.toUpperCase()}
          </p>
        </div>

        <Form
          formValues={formValues}
          onChange={handleChangeFormValues}
          handleSwapCurrencies={handleSwapCurrencies}
        />

        <RatesTable
          fromCurrency={formValues.fromCurrency}
          toCurrency={formValues.toCurrency}
          ratesList={ratesList}
        />
      </div>
    </div>
  );
};

export default Home;

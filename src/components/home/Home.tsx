import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { api } from 'src/api/api';
import { FormValues } from 'src/types/form.interface';
import { getPreviousDays, getToday } from 'src/utils/date';

import Button from '../ui/Button/Button';
import Heading from '../ui/Heading/Heading';

import Chart from './chart/Chart';
import Form from './form/Form';
import RatesTable from './ratesTable/RatesTable';

import styles from './Home.module.css';

const PREVIOUS_DAYS = getPreviousDays(10, 0);

interface Rates {
  date: string;
  currenciesRate: Record<string, number>;
}

const Home = () => {
  const [ratesList, setRatesList] = useState<Rates[]>([]);
  const [activeTab, setActiveTab] = useState<'chart' | 'tableRates'>(
    'tableRates',
  );
  const [formValues, setFormValues] = useState<FormValues>({
    fromCurrency: 'usd',
    toCurrency: 'eur',
    billsQuantity: 100,
  });

  useEffect(() => {
    Promise.allSettled(
      PREVIOUS_DAYS.map((day) => api.get(day, formValues.fromCurrency)),
    ).then((rawData) => {
      const formedData = rawData.reduce<Rates[]>((acc, dayRate) => {
        if (dayRate.status === 'fulfilled' && dayRate.value) {
          acc.push({
            date: dayRate.value.date,
            currenciesRate: dayRate.value[formValues.fromCurrency],
          });
        }
        return acc;
      }, []);
      setRatesList(formedData);
    });
  }, [formValues.fromCurrency]);

  const handleSwapCurrencies = useCallback(() => {
    setFormValues((prevState) => ({
      ...prevState,
      toCurrency: prevState.fromCurrency,
      fromCurrency: prevState.toCurrency,
    }));
  }, []);

  const handleChangeFormValues = (name: string, value: string | number) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const exchangeRate = ratesList[0]?.currenciesRate[formValues.toCurrency];

  return (
    <div className={styles.wrapper}>
      <Heading headingTag="h1" text="Currency converter" />
      <div className={styles.exchange__wrapper}>
        <div>
          <p className={styles.currentExchangeRate}>
            On {getToday()}, 1 {formValues.fromCurrency.toUpperCase()} equals to{' '}
            {exchangeRate ? exchangeRate.toFixed(2) : '0.00'}{' '}
            {formValues.toCurrency.toUpperCase()}
          </p>
        </div>

        <Form
          formValues={formValues}
          exchangeRate={exchangeRate}
          onChange={handleChangeFormValues}
          handleSwapCurrencies={handleSwapCurrencies}
        />

        <div className={styles.menu}>
          <Button
            active={activeTab === 'tableRates'}
            text="Table of exchange rates"
            onClick={() => setActiveTab('tableRates')}
          />
          <Button
            active={activeTab === 'chart'}
            text="Chart of exchange rates"
            onClick={() => setActiveTab('chart')}
          />
        </div>

        {activeTab === 'tableRates' && (
          <RatesTable
            fromCurrency={formValues.fromCurrency}
            toCurrency={formValues.toCurrency}
            ratesList={ratesList}
          />
        )}

        {activeTab === 'chart' && (
          <Chart ratesList={ratesList} toCurrency={formValues.toCurrency} />
        )}
      </div>
    </div>
  );
};

export default Home;

import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { api } from 'src/api/api';
import Button from 'src/components/ui/Button/Button';
import Heading from 'src/components/ui/Heading/Heading';
import { FormValues } from 'src/types/form.interface';
import { Rates } from 'src/types/rates.interface';
import { getPreviousDays, getToday } from 'src/utils/date';

import Chart from './chart/Chart';
import Form from './form/Form';
import RatesTable from './ratesTable/RatesTable';

import styles from './Home.module.css';

const PREVIOUS_DAYS = getPreviousDays(100, 0);

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
      fromCurrency: prevState.toCurrency,
      toCurrency: prevState.fromCurrency,
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
      <Heading headingTag="h1" text="Convert your currencies" />
      <div className={styles.exchange__wrapper}>
        <div className={styles.currentExchangeRate}>
          {`On ${getToday()}, 1 ${formValues.fromCurrency.toUpperCase()} →
            ${exchangeRate ? exchangeRate.toFixed(2) : '0.00'}
            ${formValues.toCurrency.toUpperCase()}`}
        </div>

        <Form
          formValues={formValues}
          exchangeRate={exchangeRate}
          onChange={handleChangeFormValues}
          handleSwapCurrencies={handleSwapCurrencies}
        />

        <div className={styles.heading}>
          <Heading
            headingTag="h2"
            text={`History of exchanges rate from ${formValues.fromCurrency.toUpperCase()} to ${formValues.toCurrency.toUpperCase()}`}
          />
        </div>

        <div className={styles.menu}>
          <Button
            active={activeTab === 'tableRates'}
            text="Table view"
            onClick={() => setActiveTab('tableRates')}
          />
          <Button
            active={activeTab === 'chart'}
            text="Chart view"
            onClick={() => setActiveTab('chart')}
          />
        </div>

        {activeTab === 'tableRates' && (
          <RatesTable
            fromCurrency={formValues.fromCurrency}
            toCurrency={formValues.toCurrency}
            rawRatesList={ratesList}
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

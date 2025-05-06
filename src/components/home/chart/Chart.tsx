import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import Button from 'src/components/ui/Button/Button';
import { Rates } from 'src/types/rates.interface';
import { formatToMonthDay } from 'src/utils/date';

import styles from './Chart.module.css';

interface ChartProps {
  ratesList: Rates[];
  toCurrency: string;
}

const Chart = ({ ratesList, toCurrency }: ChartProps) => {
  const [amountOfDays, setAmountOfDays] = useState<number>(10);

  const reformedRatesList = ratesList.slice(0, amountOfDays).map((rate) => ({
    date: formatToMonthDay(rate.date),
    value: rate.currenciesRate[toCurrency],
  }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.options}>
        <Button
          active={amountOfDays === 10}
          onClick={() => setAmountOfDays(10)}
          text="10 days"
        />
        <Button
          active={amountOfDays === 50}
          onClick={() => setAmountOfDays(50)}
          text="50 days"
        />
        <Button
          active={amountOfDays === 100}
          onClick={() => setAmountOfDays(100)}
          text="100 days"
        />
      </div>
      <ResponsiveContainer height={400}>
        <LineChart data={reformedRatesList}>
          <CartesianGrid strokeDasharray="3 12" />
          <XAxis dataKey="date" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

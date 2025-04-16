import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { formatToMonthDay } from 'src/utils/date';

import styles from './Chart.module.css';

interface Rates {
  date: string;
  currenciesRate: Record<string, number>;
}

interface ChartProps {
  ratesList: Rates[];
  toCurrency: string;
}

const Chart = ({ ratesList, toCurrency }: ChartProps) => {
  const reformedRatesList = ratesList.map((rate) => ({
    date: formatToMonthDay(rate.date),
    value: rate.currenciesRate[toCurrency],
  }));

  return (
    <div className={styles.wrapper}>
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

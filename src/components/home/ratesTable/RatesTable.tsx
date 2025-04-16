import Heading from 'src/components/ui/Heading/Heading';
import SkeletonTable from 'src/components/ui/Skeleton/SkeletonTable/SkeletonTable';

import styles from './RatesTable.module.css';

interface Rates {
  date: string;
  currenciesRate: Record<string, number>;
}

interface RatesTableProps {
  fromCurrency: string;
  toCurrency: string;
  ratesList: Rates[];
}

const RatesTable = ({
  fromCurrency,
  toCurrency,
  ratesList,
}: RatesTableProps) => {
  return ratesList.length <= 0 ? (
    <SkeletonTable fromCurrency={fromCurrency} toCurrency={toCurrency} />
  ) : (
    <div className={styles.tableWrapper}>
      <Heading
        headingTag="h2"
        text={`Last 10 days exchanges rate from ${fromCurrency.toUpperCase()} to ${toCurrency.toUpperCase()}`}
      />
      <table className={styles.exchangeHistory}>
        <thead className={styles.tableHeader}>
          <tr className={styles.headerRow}>
            <th>Date:</th>
            <th>Exchange Rate:</th>
          </tr>
        </thead>
        <tbody>
          {ratesList.map((rate) => (
            <tr className={styles.tableRow} key={rate.date}>
              <td className={styles.tableCell}> {rate.date}</td>
              <td className={styles.tableCell}>
                {rate.currenciesRate[toCurrency].toFixed(5)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatesTable;

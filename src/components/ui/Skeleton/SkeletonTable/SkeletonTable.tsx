import Heading from '../../Heading/Heading';

import styles from './SkeletonTable.module.css';

interface SkeletonTableProps {
  fromCurrency: string;
  toCurrency: string;
}

const SkeletonTable = ({ fromCurrency, toCurrency }: SkeletonTableProps) => {
  return (
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
          {Array.from({ length: 10 }).map((_, index) => (
            <tr className={styles.skeleton} key={index}>
              <td className={styles.tableCell}></td>
              <td className={styles.tableCell}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;

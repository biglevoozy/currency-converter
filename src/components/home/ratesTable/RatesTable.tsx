import { useState } from 'react';
import Button from 'src/components/ui/Button/Button';
import SkeletonTable from 'src/components/ui/Skeleton/SkeletonTable/SkeletonTable';
import { Rates } from 'src/types/rates.interface';
import { formatToDDMMYYY } from 'src/utils/date';

import ArrowLeftIcon from './assets/arrow-left.svg?react';
import ArrowRightIcon from './assets/arrow-right.svg?react';

import styles from './RatesTable.module.css';

interface RatesTableProps {
  fromCurrency: string;
  toCurrency: string;
  rawRatesList: Rates[];
}

const ITEMS_PER_PAGE = 5;

const RatesTable = ({
  fromCurrency,
  toCurrency,
  rawRatesList,
}: RatesTableProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const amountOfPages = Math.ceil(rawRatesList?.length / ITEMS_PER_PAGE);
  const startAmountOfRates = (currentPage - 1) * ITEMS_PER_PAGE;
  const endAmountOfRates = currentPage * ITEMS_PER_PAGE;

  const rawRatesListPaginated = rawRatesList?.slice(
    startAmountOfRates,
    endAmountOfRates,
  );

  function handlePagination(action: 'prev' | 'next') {
    if (action === 'next') {
      setCurrentPage((prevCurrentPage) =>
        prevCurrentPage === amountOfPages ? 1 : prevCurrentPage + 1,
      );
    } else if (action === 'prev') {
      setCurrentPage((prevCurrentPage) =>
        prevCurrentPage === 1 ? 21 : prevCurrentPage - 1,
      );
    }
  }

  return rawRatesList.length <= 0 ? (
    <SkeletonTable fromCurrency={fromCurrency} toCurrency={toCurrency} />
  ) : (
    <div className={styles.tableWrapper}>
      <div className={styles.pagination}>
        <Button
          icon={<ArrowLeftIcon />}
          onClick={() => handlePagination('prev')}
        />
        <span className={styles.pages}>
          Page {currentPage} of {amountOfPages}
        </span>
        <Button
          icon={<ArrowRightIcon />}
          onClick={() => handlePagination('next')}
        />
      </div>
      <table className={styles.exchangeHistory}>
        <thead className={styles.tableHeader}>
          <tr className={styles.headerRow}>
            <th>Date:</th>
            <th>Exchange Rate:</th>
          </tr>
        </thead>
        <tbody>
          {rawRatesListPaginated.map((rate) => (
            <tr className={styles.tableRow} key={rate.date}>
              <td className={styles.tableCell}>{formatToDDMMYYY(rate.date)}</td>
              <td className={styles.tableCell}>
                {rate.currenciesRate[toCurrency].toFixed(5)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div></div>
    </div>
  );
};

export default RatesTable;

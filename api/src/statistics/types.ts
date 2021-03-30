import { TransactionType } from 'src/transactions/transaction-type';

export interface GetStatisticByCategoryFilter {
  walletIds?: string[];
  ignoreWalletIds?: string[];
  currencyName?: string;
  type?: TransactionType;
  from?: number;
  to?: number;
}

export interface GetStatisticByPeriodFilter {
  interval?: Interval;
  from?: number;
  to?: number;
}

export interface GetStatisticByCurrencyFilter {
  walletIds?: string[];
}

export type Interval = 'day' | 'week' | 'month' | 'year';

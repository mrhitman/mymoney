import React from 'react';
import { GetTransactionsQuery } from 'src/generated/graphql';

export interface TransactionAmountProps {
  record: GetTransactionsQuery['transactions']['items'][number];
}

export const TransactionAmount: React.FC<TransactionAmountProps> = ({ record }) => {
  switch (record.type) {
    case 'income':
      return (
        <div className={`tbl-${record.type}`}>
          +{record.amount} {record.currency.symbol}
        </div>
      );
    case 'outcome':
      return (
        <div className={`tbl-${record.type}`}>
          -{record.amount} {record.currency.symbol}
        </div>
      );
    case 'transfer':
      return (
        <div className={`tbl-${record.type}`}>
          {record.amount} {record.currency.symbol}
        </div>
      );
    default:
      return <div>Unknown transaction type</div>;
  }
};

import React, { FC } from 'react';
import { Transaction, TransactionType } from 'src/generated/graphql';

export interface Props {
  record: Pick<Transaction, 'currency' | 'type' | 'amount'>;
}

export const TransactionAmount: FC<Props> = ({ record }) => {
  switch (record.type) {
    case TransactionType.Income:
      return (
        <div className={`tbl-${record.type}`}>
          +{record.amount} {record.currency.symbol}
        </div>
      );
    case TransactionType.Outcome:
      return (
        <div className={`tbl-${record.type}`}>
          -{record.amount} {record.currency.symbol}
        </div>
      );
    case TransactionType.Transfer:
      return (
        <div className={`tbl-${record.type}`}>
          {record.amount} {record.currency.symbol}
        </div>
      );
    default:
      return <div>Unknown transaction type</div>;
  }
};

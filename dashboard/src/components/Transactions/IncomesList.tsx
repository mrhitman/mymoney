import React, { FC } from 'react';
import { TransactionType } from 'src/generated/graphql';
import TransactionList from './TransactionList';

export const IncomesList: FC = () => (
  <TransactionList type={TransactionType.Income} />
);

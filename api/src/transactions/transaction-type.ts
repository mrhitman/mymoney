import { registerEnumType } from '@nestjs/graphql';

export enum TransactionType {
  income = 'income',
  outcome = 'outcome',
  transfer = 'transfer',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
});

import { registerEnumType } from '@nestjs/graphql';

export enum CategoryType {
  income = 'income',
  outcome = 'outcome',
  transfer = 'transfer',
}

registerEnumType(CategoryType, {
  name: 'CategoryType',
});

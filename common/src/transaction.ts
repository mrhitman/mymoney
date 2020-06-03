import { types, Instance, IAnyType } from 'mobx-state-tree';
import { Category } from './category';
import { Wallet } from './wallet';
import { Currency } from './currency';

export enum TransactionType {
  income = 'income',
  outcome = 'outcome',
  transfer = 'transfer',
}

export const Transaction = (types
  .model('Transaction', {
    id: types.identifier,
    category: types.reference(Category),
    type: types.enumeration(Object.keys(TransactionType)),
    source: types.maybeNull(types.reference(Wallet)),
    destination: types.maybeNull(types.reference(Wallet)),
    date: types.optional(types.Date, new Date()),
    amount: types.number,
    currency: types.reference(Currency),
    description: types.optional(types.string, ''),
    fine: types.optional(types.number, 0),
    transferOptions: types.maybe(
      types.model({
        from: types.reference(types.late(() => Transaction)),
        to: types.reference(types.late(() => Transaction)),
        instance: types.reference(types.late(() => Transaction)),
      })
    ),
  })
  .preProcessSnapshot((snapshot: any) => {
    return {
      id: snapshot.id,
      currency: snapshot.currencyId,
      category: snapshot.categoryId,
      source: snapshot.sourceWalletId,
      destination: snapshot.destinationWalletId,
      type: snapshot.type,
      description: snapshot.description,
      amount: Number(snapshot.amount),
      date: new Date(snapshot.date),
    };
  }) as any) as TransactionLike;

interface TransactionLike extends IAnyType {
  id: string;
  category: Instance<typeof Category>;
  type: TransactionType;
  source: Instance<typeof Wallet>;
  destination: string;
  date: Date;
  amount: number;
  currency: Instance<typeof Currency>;
  description: string;
  fine: number;
  transferOptions: {
    from: TransactionLike;
    to: TransactionLike;
    instance: TransactionLike;
  };
}

import { Model } from 'objection';
import Currency from './currency.model';

export class Transaction extends Model {
  public id: string;
  public userId: number;
  public type: string;
  public categoryId: string;
  public sourceWalletId: string;
  public destinationWalletId: string;
  public currencyId: string;
  public description: string;
  public fine: number;
  public amount: number;
  public date: Date;
  public syncAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public currency: Currency;

  static get tableName() {
    return 'transactions';
  }

  static get relationMappings() {
    return {
      currency: {
        relation: Model.HasOneRelation,
        modelClass: Currency,
        join: {
          from: 'transactions.currencyId',
          to: 'currencies.id',
        },
      },
    };
  }
}

export default Transaction;

import { Model } from 'objection';
import Category from './category.model';
import Currency from './currency.model';
import { TransactionType } from 'src/transactions/transaction-type';

export interface TransactionScheduleTemplate {
  interval: 'day' | 'week' | 'month' | 'year';
  intervalOptions?: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] | 'all';
  frequency: number;
}

export class Transaction extends Model {
  public id: string;
  public userId: number;
  public type: TransactionType;
  public categoryId: string;
  public sourceWalletId: string;
  public destinationWalletId: string;
  public currencyId: string;
  public description: string;
  public fine: number;
  public amount: number;
  public isTemplate: boolean;
  public isPlanned: boolean;
  public isAutoGenerated: boolean;
  public isNecessary: boolean;
  public template?: TransactionScheduleTemplate;
  public date: Date;
  public syncAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public currency: Currency;
  public category: Category;

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
      category: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        join: {
          from: 'transactions.categoryId',
          to: 'categories.id',
        },
      },
    };
  }
}

export default Transaction;

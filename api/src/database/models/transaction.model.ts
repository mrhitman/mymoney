import { Model } from 'objection';

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

  static get tableName() {
    return 'transactions';
  }
}

export default Transaction;

import { Model } from 'objection';

export class Transaction extends Model {
  public id: string;
  public userId: number;
  public categoryId: string;
  public sourceWalletId: string;
  public destinationWalletId: string;
  public fine: number;
  public amount: number;
  public date: Date;
  public lastSync: Date;
  public createdAt: Date;

  static get tableName() {
    return 'transactions';
  }
}

export default Transaction;

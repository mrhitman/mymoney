import { Model } from 'objection';

export class Transaction extends Model {
  public id: string;
  public user_id: number;
  public category_id: string;
  public source_wallet_id: string;
  public destination_wallet_id: string;
  public fine: number;
  public amount: number;
  public date: Date;
  public last_sync: Date;
  public created_at: Date;

  static get tableName() {
    return 'transactions';
  }
}

export default Transaction;

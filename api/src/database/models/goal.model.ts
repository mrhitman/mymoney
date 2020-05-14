import { Model } from 'objection';

export class Goal extends Model {
  public id: string;
  public userId: number;
  public walletId: string;
  public currencyId: string;
  public goal: number;
  public progress: number;
  public lastSync: Date;
  public createdAt: Date;

  static get tableName() {
    return 'goals';
  }
}

export default Goal;

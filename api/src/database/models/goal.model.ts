import { Model } from 'objection';

export class Goal extends Model {
  public id: string;
  public userId: number;
  public walletId: string;
  public currencyId: string;
  public goal: number;
  public progress: number;
  public syncAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  static get tableName() {
    return 'goals';
  }
}

export default Goal;

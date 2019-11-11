import { Model } from 'objection';

export class Goal extends Model {
  public id: string;
  public user_id: number;
  public wallet_id: string;
  public currency_id: string;
  public goal: number;
  public progress: number;
  public last_sync: Date;
  public created_at: Date;

  static get tableName() {
    return 'goals';
  }
}

export default Goal;

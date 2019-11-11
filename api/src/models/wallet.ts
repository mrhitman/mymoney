import { Model } from 'objection';

export class Wallet extends Model {
  public id: string;
  public user_id: number;
  public name: string;
  public description: string;
  public cardNumber: string;
  public type: string;
  public pockets: any;
  public last_sync: Date;
  public created_at: Date;

  static get tableName() {
    return 'wallets';
  }
}

export default Wallet;

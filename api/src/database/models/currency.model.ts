import { Model } from 'objection';

export class Currency extends Model {
  public id: string;
  public name: string;
  public description: string;
  public code: number;
  public symbol: string;
  public flagCode: string;

  static get tableName() {
    return 'currencies';
  }
}

export default Currency;

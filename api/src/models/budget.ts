import { Model } from 'objection';

export class Budget extends Model {
  public id: string;
  public user_id: number;
  public outcomes: any;
  public incomes: any;
  public savings: any;
  public currency_id: string;
  public date: Date;
  public deadline: Date;
  public last_sync: Date;
  public created_at: Date;

  static get tableName() {
    return 'budgets';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        outcomes: { type: 'array' },
        incomes: { type: 'array' },
        savings: { type: 'array' },
        date: { type: 'date-time' },
        deadline: { type: 'date-time' },
      },
    };
  }
}

export default Budget;

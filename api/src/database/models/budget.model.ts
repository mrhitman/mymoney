import { Model } from 'objection';

export class Budget extends Model {
  public id: string;
  public userId: number;
  public outcomes: any;
  public incomes: any;
  public savings: any;
  public currencyId: string;
  public date: Date;
  public deadline: Date;
  public lastSync: Date;
  public createdAt: Date;

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

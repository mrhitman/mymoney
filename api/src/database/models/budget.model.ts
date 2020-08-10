import { Model } from 'objection';

export interface BudgetCategory {
  categoryId: string;
  amount: number;
  progress: number;
}

export class Budget extends Model {
  public id: string;
  public userId: number;
  public outcomes: BudgetCategory[];
  public incomes: any;
  public savings: any;
  public active: boolean;
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
        outcomes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              categoryId: { type: 'string' },
              amount: { type: 'number', min: 0 },
              progress: { type: 'number', min: 0 },
            }
          }
        },
        incomes: { type: 'array' },
        savings: { type: 'array' },
        date: { type: 'date-time' },
        deadline: { type: 'date-time' },
      },
    };
  }
}

export default Budget;

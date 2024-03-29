import { Model } from 'objection';
import { budgetCategoriesJsonSchema } from './misc';
import { BudgetCategory } from './types';


export class Budget extends Model {
  public id: string;
  public userId: number;
  public outcomes: BudgetCategory[];
  public incomes: BudgetCategory[];
  public savings: any;
  public active: boolean;
  public currencyId: string;
  public date: Date;
  public deadline: Date;
  public lastSync: Date;
  public createdAt: Date;

  static get tableName() {
    return 'budget';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        outcomes: budgetCategoriesJsonSchema,
        incomes: budgetCategoriesJsonSchema,
        savings: { type: 'array' },
        date: { type: 'date-time' },
        deadline: { type: 'date-time' },
      },
    };
  }
}

export default Budget;

import { Model } from 'objection';
import { BudgetCategory } from './types';
import { budgetCategoriesJsonSchema } from './misc';

export class BudgetTemplate extends Model {
  public id: string;
  public userId: number;
  public outcomes: BudgetCategory[];
  public incomes: BudgetCategory[];
  public savings: any;
  public active: boolean;
  public currencyId: string;
  public lastSync: Date;
  public createdAt: Date;

  static get tableName() {
    return 'budget_template';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        outcomes: budgetCategoriesJsonSchema,
        incomes: budgetCategoriesJsonSchema,
        savings: { type: 'array' },
      },
    };
  }
}

export default BudgetTemplate;

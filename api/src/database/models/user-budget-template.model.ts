import { Model } from 'objection';
import { BudgetCategory } from './types';
import { budgetCategoriesJsonSchema } from './misc';

export class UserBudgetTemplate extends Model {
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
    return 'user_budget_template';
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

export default UserBudgetTemplate;

import { Model } from 'objection';
import { CategoryType } from 'src/categories/category-type';
import { Category, Icon } from './category.model';
export class UserCategory extends Model {
  public id: string;
  public name: string;
  public userId: number;
  public categoryId: string;
  public parent: string;
  public type: CategoryType;
  public icon: Icon;
  public isFixed: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public syncAt: Date;
  public codes: number[];
  public baseCategory: Category;

  static get tableName() {
    return 'user_categories';
  }

  static get relationMappings() {
    return {
      baseCategory: {
        relation: Model.HasOneRelation,
        modelClass: Category,
        join: {
          from: 'user_categories.categoryId',
          to: 'categories.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        codes: { type: 'array' },
      },
    };
  }
}

export default UserCategory;

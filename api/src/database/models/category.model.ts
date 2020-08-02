import { Model } from 'objection';
import { CategoryType } from 'src/categories/category-type';

export interface Icon {
  type: string;
  name: string;
  backgroundColor: string;
  color: string;
}

export class Category extends Model {
  public id: string;
  public name: string;
  public userId: number;
  public parent: string;
  public type: CategoryType;
  public icon: Icon;
  public isFixed: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public syncAt: Date;
  public codes: number[];

  static get tableName() {
    return 'categories';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        codes: { type: 'array' },
      }
    }
  }
}

export default Category;

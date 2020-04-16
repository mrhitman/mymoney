import { Model } from 'objection';

export class Category extends Model {
  public id: string;
  public name: string;
  public userId: number;
  public type: string;
  public icon: any;
  public lastSync: Date;
  public createdAt: Date;

  static get tableName() {
    return 'categories';
  }
}

export default Category;

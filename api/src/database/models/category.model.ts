import { Model } from 'objection';

interface Icon {
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
  public type: string;
  public icon: Icon;
  public isFixed: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public syncAt: Date;

  static get tableName() {
    return 'categories';
  }
}

export default Category;

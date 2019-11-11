import { Model } from 'objection';

export class Category extends Model {
  public id: string;
  public name: string;
  public user_id: number;
  public type: string;
  public icon: any;
  public last_sync: Date;
  public created_at: Date;

  static get tableName() {
    return 'categories';
  }
}

export default Category;

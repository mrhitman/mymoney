import { Model } from 'objection';

export class User extends Model {
  public id: number;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public settings: any;
  public syncAt: Date;
  public imageUrl: string;
  public additional: any;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  static get tableName() {
    return 'user';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        settings: { type: 'object' },
        additional: { type: 'object' },
      },
    };
  }
}

export default User;

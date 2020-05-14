import { Model } from 'objection';

export class User extends Model {
  public id: number;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public settings: any;
  public lastSync: Date;
  public data: any;
  public createdAt: Date;

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        settings: { type: 'object' },
      },
    };
  }
}

export default User;

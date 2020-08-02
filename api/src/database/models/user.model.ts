import { Model } from 'objection';

export class User extends Model {
  public id: number;
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public settings: any;
  public connections: any[];
  public syncAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        connections: { type: 'array' },
        settings: { type: 'object' },
      },
    };
  }
}

export default User;

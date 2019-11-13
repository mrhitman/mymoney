import { Model } from 'objection';

export class User extends Model {
  public id: number;
  public first_name: string;
  public middle_name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public settings: any;
  public last_sync: Date;
  public data: any;
  public created_at: Date;

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

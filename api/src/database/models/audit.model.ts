import { Model } from 'objection';
import { User } from './user.model';

export enum AuditOperation {
  login = 'login',
  logout = 'logout',
  refresh = 'refresh',
  emailConfirmed = 'email-confirmed',
  recoveryPassword = 'recovery-password',
  changePassword = 'change-password',
  invalidPasswordTry = 'invalid-password-try',
}

export class Audit extends Model {
  public id: number;
  public userId: number;
  public operation: AuditOperation;
  public ip: string;
  public peer: any;
  public createdAt: Date;
  public updatedAt: Date;
  public user: User;

  static get tableName() {
    return 'audit';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${this.tableName}.userId`,
          to: `${User.tableName}.id`,
        },
      },
    };
  }
}

export default Audit;

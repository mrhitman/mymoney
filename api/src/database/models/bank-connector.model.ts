import { Model } from 'objection';
import User from './user.model';

export enum BankConnectorType {
  MONOBANK = 'monobank',
  PRIVAT24 = 'privat24',
}

export class BankConnector extends Model {
  public id: number;
  public description: string;
  public type: BankConnectorType;
  public userId: number;
  public enabled: boolean;
  public meta: any;
  public interval: number;
  public syncAt: Date;
  public connectedAt: Date;
  public createdAt: Date;
  public user: User;

  static get tableName() {
    return 'bank_connector';
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

export default BankConnector;

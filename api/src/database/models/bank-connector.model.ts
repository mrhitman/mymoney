import { Model } from 'objection';
import User from './user.model';

export enum BankConnectorType {
  MONOBANK = 'monobank',
  PRIVAT24 = 'privat24'
}

export class BankConnector extends Model {
  public id: number;
  public type: BankConnectorType;
  public userId: number;
  public enabled: boolean;
  public meta: any;
  public connectedAt: Date;
  public createdAt: Date;
  public user: User;

  static get tableName() {
    return 'bank_connectors';
  }

}

export default BankConnector;

import { Model } from 'objection';
import Wallet from './wallet.model';

export class Goal extends Model {
  public id: string;
  public userId: number;
  public walletId: string;
  public currencyId: string;
  public goal: number;
  public progress: number;
  public syncAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public wallet: Wallet;

  static get tableName() {
    return 'goals';
  }

  static get relationMappings() {
    return {
      wallet: {
        relation: Model.HasOneRelation,
        modelClass: Wallet,
        join: {
          from: 'goals.walletId',
          to: 'wallets.id',
        },
      },
    };
  }
}

export default Goal;

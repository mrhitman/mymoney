import { Model } from 'objection';
import { Pocket, Wallet } from './wallet.model';

export class WalletHistory extends Model {
  public id: number;
  public walletId: string;
  public userId: number;
  public pockets: Pocket[];
  public createdAt: Date;
  public updatedAt: Date;
  public wallet: Wallet;

  static get tableName() {
    return 'wallet_history';
  }

  static get relationMappings() {
    return {
      wallet: {
        relation: Model.HasOneRelation,
        modelClass: Wallet,
        join: {
          from: `${this.tableName}.walletId`,
          to: `${Wallet.tableName}.id`,
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        pockets: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              amount: { type: 'number' },
              currencyId: { type: 'string' },
            },
            required: ['amount', 'currencyId'],
            additionalProperties: false,
          },
        },
      },
    };
  }
}

export default WalletHistory;

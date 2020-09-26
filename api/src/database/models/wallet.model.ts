import { Model } from 'objection';

export interface Pocket {
  amount: number;
  currencyId: string;
}

export class Wallet extends Model {
  public id: string;
  public userId: number;
  public name: string;
  public description: string;
  public cardNumber: string;
  public type: string;
  public pockets: Pocket[];
  public allowNegativeBalance: boolean;
  public isImported: boolean;
  public meta: any;
  public syncAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;

  static get tableName() {
    return 'wallets';
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

export default Wallet;

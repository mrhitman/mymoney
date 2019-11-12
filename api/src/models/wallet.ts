import { Model } from 'objection';

export interface Pocket {
  id: string;
  amount: number;
  currency_id: string;
}

export class Wallet extends Model {
  public id: string;
  public user_id: number;
  public name: string;
  public description: string;
  public cardNumber: string;
  public type: string;
  public pockets: Pocket[];
  public last_sync: Date;
  public created_at: Date;

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
              currency_id: { type: 'string' },
            },
            required: ['id', 'amount', 'currency_id'],
            additionalProperties: false,
          },
        },
      },
    };
  }
}

export default Wallet;

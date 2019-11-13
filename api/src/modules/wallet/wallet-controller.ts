import Controller from '../../components/controller';
import WalletProvider from './wallet-service';
import joi from 'joi';

export class WalletController extends Controller {
  protected path = '/wallets';
  protected provider: WalletProvider;
  protected rules = {
    basic: {
      id: joi.string().required(),
      name: joi.string(),
      description: joi.string(),
      cardNumber: joi.string(),
      pockets: joi.array().items(
        joi.object({
          id: joi
            .string()
            .guid()
            .required(),
          amount: joi.number().required(),
          currency_id: joi
            .string()
            .guid()
            .required(),
        }),
      ),
      type: joi.string(),
    },
  };

  constructor(provider?: WalletProvider) {
    super();
    this.provider = provider || new WalletProvider();
    this.route(['post', '/', this.create]);
    this.route(['patch', '/', this.update]);
    this.route(['get', '/:id?', this.get]);
    this.route(['delete', '/:id', this.delete]);
  }

  public async create(ctx) {
    this.validate(ctx, {
      ...this.rules.basic,
      name: joi.string().required(),
    });
    ctx.body = await this.provider.create(ctx.request.body);
  }

  public async update(ctx) {
    this.validate(ctx, this.rules.basic);
    ctx.body = await this.provider.update(ctx.request.body);
  }

  public async get(ctx) {
    ctx.body = await this.provider.get(ctx.params.id);
  }

  public async delete(ctx) {
    ctx.body = await this.provider.delete(ctx.params.id);
  }
}

export default WalletController;

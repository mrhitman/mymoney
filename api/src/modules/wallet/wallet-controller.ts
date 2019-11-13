import Controller from '../../components/controller';
import WalletProvider from './wallet-service';
import joi from 'joi';

export class WalletController extends Controller {
  protected path = '/wallets';
  protected provider: WalletProvider;

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
      id: joi.string().required(),
      name: joi.string().required(),
      description: joi.string(),
      cardNumber: joi.string(),
      pockets: joi.array(),
      type: joi.string(),
    });
    ctx.body = await this.provider.create(ctx.request.body);
  }

  public async update(ctx) {
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

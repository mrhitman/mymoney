import Controller from '../../components/controller';
import WalletProvider from './wallet-service';
import joi from 'joi';

export class WalletController extends Controller {
  protected path = '/wallets';
  protected provider: WalletProvider;

  constructor() {
    super();
    this.provider = new WalletProvider();
    this.route(['post', '/', this.create]);
    this.route(['patch', '/', this.update]);
  }

  public async create(ctx) {
    this.validate(ctx, {
      name: joi.string().required(),
      description: joi.string(),
      cardNumber: joi.string(),
      type: joi.string(),
    });
    ctx.body = await this.provider.create(ctx.body);
  }

  public async update(ctx) {
    ctx.body = await this.provider.update(ctx.body);
  }
}

export default WalletController;

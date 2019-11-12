import Controller from '../../components/controller';
import WalletProvider from './wallet-service';

export class WalletController extends Controller {
  protected path = '/wallets';
  protected provider: WalletProvider;

  constructor() {
    super();
    this.provider = new WalletProvider();
    this.route(['post', '/', this.create]);
  }

  public async create(ctx) {
    ctx.body = await this.provider.create(ctx.body);
  }
}

export default WalletController;

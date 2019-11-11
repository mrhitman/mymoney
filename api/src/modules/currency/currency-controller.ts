import Controller from '../../components/controller';
import CurrencyProvider from './service';

export class CurrencyController extends Controller {
  protected path = '/currencies';
  protected provider: CurrencyProvider;

  constructor(provider?: CurrencyProvider) {
    super();
    this.provider = provider || new CurrencyProvider();
    this.route(['get', '/', this.get]);
  }

  public async get(ctx) {
    ctx.body = await this.provider.latest();
  }
}

export default CurrencyController;

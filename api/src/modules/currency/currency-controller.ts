import { find } from 'lodash';
import { BadRequest } from 'ts-httpexceptions';
import Controller from '../../components/controller';
import CurrencyProvider from './currency-service';

export class CurrencyController extends Controller {
  protected path = '/currencies';
  protected provider: CurrencyProvider;

  constructor(provider?: CurrencyProvider) {
    super();
    this.provider = provider || new CurrencyProvider();
    this.route(['get', '/info', this.getInfo]);
    this.route(['get', '/convert/:from/:to/:amount', this.convert]);
    this.route(['get', '/:base?', this.get]);
  }

  public async get(ctx) {
    ctx.body = await this.provider.latest(ctx.params.base);
  }

  public async getInfo(ctx) {
    ctx.body = await this.provider.getIsoInfo();
  }

  public async convert(ctx) {
    const response = await this.provider.latest();
    const from = find(response.rates, (_, name) => name === ctx.params.from);
    const to = find(response.rates, (_, name) => name === ctx.params.to);
    if (!from || !to) {
      throw new BadRequest('Invalid currency name');
    }
    if (isNaN(ctx.params.amount)) {
      throw new BadRequest('Invalid currency amount');
    }
    ctx.body = (ctx.params.amount / from) * to;
  }
}

export default CurrencyController;

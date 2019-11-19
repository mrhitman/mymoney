import Controller from '../../components/controller';
import TransactionProvider from './transaction-service';

export class TransactionController extends Controller {
  protected path = '/transactions';
  protected provider: TransactionProvider;

  constructor(middlewares = [], provider?: TransactionProvider) {
    super(middlewares);
    this.provider = provider || new TransactionProvider();
    this.route(['post', '/', this.create]);
    this.route(['patch', '/', this.update]);
    this.route(['get', '/:id?', this.get]);
    this.route(['delete', '/:id', this.delete]);
  }

  protected async create(ctx) {
    ctx.body = this.provider.create({
      ...ctx.request.body,
      user_id: ctx.state.jwtdata.id,
    });
  }

  protected async update(ctx) {
    ctx.body = this.provider.update(ctx.request.body);
  }

  protected async get(ctx) {
    ctx.body = this.provider.get(ctx.state.jwtdata.id, ctx.params.id);
  }

  protected async delete(ctx) {
    ctx.body = this.provider.delete(ctx.state.jwtdata.id, ctx.params.id);
  }
}

export default TransactionController;

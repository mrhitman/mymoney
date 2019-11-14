import Controller from '../../components/controller';
import CategoryProvider from './category-controller';

export class CategoryController extends Controller {
  protected path = '/categories';
  protected provider: CategoryProvider;

  constructor(provider?: CategoryProvider) {
    super();
    this.provider = provider || new CategoryProvider();
    this.route(['post', '/', this.create]);
    this.route(['patch', '/', this.update]);
    this.route(['get', '/:id?', this.get]);
    this.route(['delete', '/:id', this.delete]);
  }

  protected async create(ctx) {
    ctx.body = this.provider.create(ctx.request.body);
  }

  protected async update(ctx) {
    ctx.body = this.provider.update(ctx.request.body);
  }

  protected async get(ctx) {
    ctx.body = this.provider.get(ctx.params.id);
  }

  protected async delete(ctx) {
    ctx.body = this.provider.get(ctx.params.id);
  }
}

export default CategoryController;

import Controller from '../../components/controller';
import CategoryProvider from './category-service';
import joi from 'joi';

export class CategoryController extends Controller {
  protected path = '/categories';
  protected provider: CategoryProvider;

  constructor(middlewares = [], provider?: CategoryProvider) {
    super(middlewares);
    this.provider = provider || new CategoryProvider();
    this.route(['post', '/', this.create]);
    this.route(['patch', '/', this.update]);
    this.route(['get', '/:id?', this.get]);
    this.route(['delete', '/:id', this.delete]);
  }

  protected async create(ctx) {
    this.validate(ctx, {
      id: joi
        .string()
        .guid()
        .required(),
      name: joi.string().required(),
      type: joi.string(),
      icon: joi.object(),
    });
    ctx.body = await this.provider.create({
      ...ctx.request.body,
      user_id: ctx.state.jwtdata.id,
    });
  }

  protected async update(ctx) {
    ctx.body = await this.provider.update({
      ...ctx.request.body,
      user_id: ctx.state.jwtdata.id,
    });
  }

  protected async get(ctx) {
    ctx.body = await this.provider.get(ctx.state.jwtdata.id, ctx.params.id);
  }

  protected async delete(ctx) {
    ctx.body = await this.provider.delete(ctx.state.jwtdata.id, ctx.params.id);
  }
}

export default CategoryController;

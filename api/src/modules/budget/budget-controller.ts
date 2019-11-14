import Controller from '../../components/controller';
import BudgetProvider from './budget-services';
import joi from 'joi';

export class BudgetController extends Controller {
  protected path = '/budgets';
  protected provider: BudgetProvider;
  protected rules = {
    basic: {
      id: joi
        .string()
        .guid()
        .required(),
      incomes: joi.array().items(joi.object()),
      outcomes: joi.array().items(joi.object()),
      savings: joi.array().items(joi.object()),
      currency_id: joi.string().guid(),
      date: joi.string().isoDate(),
      dealine: joi.string().isoDate(),
    },
  };

  constructor(provider?: BudgetProvider) {
    super();
    this.provider = provider || new BudgetProvider();
    this.route(['post', '/', this.create]);
    this.route(['patch', '/', this.update]);
    this.route(['get', '/:id?', this.get]);
    this.route(['delete', '/:id', this.delete]);
  }

  protected async create(ctx) {
    this.validate(ctx, this.rules.basic);
    ctx.body = await this.provider.create(ctx.request.body);
  }

  protected async update(ctx) {
    this.validate(ctx, this.rules.basic);
    ctx.body = await this.provider.update(ctx.request.body);
  }

  protected async get(ctx) {
    ctx.body = await this.provider.get(ctx.params.id);
  }

  protected async delete(ctx) {
    ctx.body = await this.provider.delete(ctx.params.id);
  }
}

export default BudgetController;

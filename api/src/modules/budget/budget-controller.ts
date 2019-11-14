import joi from 'joi';
import Controller from '../../components/controller';
import BudgetProvider from './budget-services';

export class BudgetController extends Controller {
  protected path = '/budgets';
  protected provider: BudgetProvider;

  protected categoryRule = {
    id: joi
      .string()
      .guid()
      .required(),
    category_id: joi
      .string()
      .guid()
      .required(),
    currency_id: joi
      .string()
      .guid()
      .required(),
    goal: joi.number().required(),
    progress: joi.number().required(),
  };

  protected savingsRule = {
    id: joi
      .string()
      .guid()
      .required(),
    wallet_id: joi
      .string()
      .guid()
      .required(),
    goal: joi.number().required(),
    progress: joi.number().required(),
  };

  protected rules = {
    basic: {
      id: joi
        .string()
        .guid()
        .required(),
      incomes: joi.array().items(joi.object(this.categoryRule)),
      outcomes: joi.array().items(joi.object(this.categoryRule)),
      savings: joi.array().items(joi.object(this.savingsRule)),
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
    this.validate(ctx, {
      ...this.rules.basic,
      currency_id: joi
        .string()
        .guid()
        .required(),
    });
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

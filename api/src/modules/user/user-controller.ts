import Controller from '../../components/controller';
import UserProvider from './user-service';
import joi from 'joi';

export class UserController extends Controller {
  protected path = '/users';
  protected provider: UserProvider;

  constructor(provider?: UserProvider) {
    super();
    this.provider = provider || new UserProvider();
    this.route(['get', '/:id?', this.get]);
    this.route(['delete', '/:id', this.delete]);
    this.route(['post', '/', this.create]);
    this.route(['post', '/login', this.login]);
    this.route(['post', '/logout', this.logout]);
    this.route(['patch', '/', this.update]);
  }

  public async get(ctx) {
    ctx.body = await this.provider.get(ctx.params.id);
  }

  public async delete(ctx) {
    ctx.body = await this.provider.delete(ctx.params.id);
  }

  public async create(ctx) {
    this.validate(ctx, {
      email: joi
        .string()
        .email()
        .required(),
      first_name: joi.string(),
      middle_name: joi.string(),
      last_name: joi.string(),
      password: joi.string().required(),
    });

    ctx.body = await this.provider.create(ctx.request.body);
  }

  public async update(ctx) {
    ctx.body = await this.provider.update(ctx.request.body);
  }

  public async login(ctx) {
    ctx.body = await this.provider.login(ctx.request.body);
  }

  public async logout(ctx) {
    ctx.body = {};
  }
}

export default UserController;

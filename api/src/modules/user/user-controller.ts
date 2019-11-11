import Controller from '../../components/controller';
import UserProvider from './service';

export class UserController extends Controller {
  protected path = '/users';
  protected provider: UserProvider;

  constructor() {
    super();
    this.provider = new UserProvider();
    this.router.post(`${this.path}/create`, this.create.bind(this));
  }

  public async create(ctx) {
    global.console.log(ctx.request);
    ctx.body = await this.provider.create(ctx.request.body);
  }
}

export default UserController;

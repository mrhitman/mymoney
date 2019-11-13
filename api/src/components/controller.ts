import joi from 'joi';
import Koa from 'koa';
import Router from 'koa-router';
import { BadRequest } from 'ts-httpexceptions';

type Method = 'get' | 'post' | 'delete' | 'patch' | 'update';
type Handler = (ctx: Koa.Context) => Promise<void>;
interface Middlewares {
  before?: any[];
  after?: any[];
}

export class Controller {
  protected router: Router;
  protected path = '/';

  constructor() {
    this.router = Router();
  }

  public static register(app: Koa) {
    const controller = new this();
    app.use(controller.router.routes());
    return controller;
  }

  protected validate(ctx: Koa.Context, keys: joi.SchemaMap) {
    const schema = joi
      .object()
      .options({ abortEarly: false })
      .keys(keys);

    const { error } = joi.validate(ctx.request.body, schema);

    if (!error) {
      return true;
    }

    throw new BadRequest(
      'Invalid request',
      error.details.map(e => e.message),
    );
  }

  protected route(
    args:
      | [Method, string, Handler]
      | { method: Method; url: string; handler: Handler },
    middlewares?: Middlewares,
  ) {
    if (!Array.isArray(args)) {
      this.route([args.method, args.url, args.handler]);
    } else {
      const [method, url, cb] = args;
      this.router[method](
        this.path + url,
        ...(middlewares?.before || []),
        cb.bind(this),
        ...(middlewares?.after || []),
      );
    }
  }
}

export default Controller;

import joi from 'joi';
import Koa, { Middleware } from 'koa';
import Router from 'koa-router';
import { BadRequest } from 'ts-httpexceptions';

type Method = 'get' | 'post' | 'delete' | 'patch' | 'update';
type Handler = ((ctx: Koa.Context) => Promise<void> | void) | Middleware;

interface Middlewares {
  before?: any[];
  after?: any[];
}
import jwt from '../middlewares/jwt';

export class Controller {
  protected router: Router;
  protected path = '/';
  protected rules = {};

  constructor(middlewares = []) {
    this.router = new Router();
    this.router.use(middlewares);
  }

  public static register(app: Koa, middlewares = []) {
    const controller = new this(middlewares);
    app.use(controller.router.routes());
    app.use(controller.router.allowedMethods());
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
      | [Method, string, Handler | Handler[]]
      | { method: Method; url: string; handler: Handler | Handler[] },
  ) {
    if (!Array.isArray(args)) {
      this.route([args.method, args.url, args.handler]);
    } else {
      const [method, url, cb] = args;
      this.router[method](
        this.path + url,
        ...(Array.isArray(cb) ? cb : [cb])
          .filter(c => !!c)
          .map(c => c.bind(this)),
      );
    }
  }
}

export default Controller;

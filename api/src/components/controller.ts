import Router from 'koa-router';
import Koa from 'koa';

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
}

export default Controller;

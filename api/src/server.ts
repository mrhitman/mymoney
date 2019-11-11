import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import logger from 'koa-morgan';
import { Model } from 'objection';
import ErrorHandler from './components/error-handler';
import UserController from './modules/user/user-controller';
import db from './services/db';

Model.knex(db);

export function createApp() {
  const app = new Koa();
  app.use(helmet());
  app.use(bodyparser());
  app.use(logger('tiny'));
  app.use(ErrorHandler);
  UserController.register(app);
  return app;
}

if (!module.parent) {
  const app = createApp();
  const port = process.env.PORT || 3000;
  app.listen(port, () => global.console.log(`Server UP ${port}`));
}

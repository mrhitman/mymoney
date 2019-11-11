import dotenv from 'dotenv';
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import logger from 'koa-morgan';
import UserController from './modules/user/user-controller';

dotenv.config();

export function createApp() {
  const app = new Koa();
  app.use(helmet());
  app.use(bodyparser());
  app.use(logger('tiny'));
  UserController.register(app);
  return app;
}

if (!module.parent) {
  const app = createApp();
  const port = process.env.PORT || 3000;
  app.listen(port, () => global.console.log(`Server UP ${port}`));
}

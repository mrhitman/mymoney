import dotenv from 'dotenv';
dotenv.config();
import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import logger from 'koa-morgan';
import passport from 'koa-passport';
import { Model } from 'objection';
import ErrorHandler from './components/error-handler';
import BudgetController from './modules/budget/budget-controller';
import CategoryController from './modules/category/category-controller';
import CurrencyController from './modules/currency/currency-controller';
import TransactionController from './modules/transaction/transaction-controller';
import UserController from './modules/user/user-controller';
import WalletController from './modules/wallet/wallet-controller';
import db from './services/db';
import jwt from './middlewares/jwt';

Model.knex(db);

export function createApp() {
  const app = new Koa();
  app.use(helmet());
  app.use(bodyparser());
  app.use(logger('dev'));
  app.use(passport.initialize());
  app.use(ErrorHandler);
  UserController.register(app);
  WalletController.register(app, [jwt]);
  BudgetController.register(app, [jwt]);
  TransactionController.register(app, [jwt]);
  CurrencyController.register(app);
  CategoryController.register(app, [jwt]);
  return app;
}

if (!module.parent) {
  const app = createApp();
  const port = process.env.PORT || 3000;
  app.listen(port, () => global.console.log(`Server UP ${port}`));
}

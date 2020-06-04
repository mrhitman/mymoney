import { Account, Category, Currency, Transaction, Wallet } from 'common';
import {
  GetCategoryResponse,
  GetCurrencyResponse,
  GetProfileResponse,
  GetRateResponse,
  GetTransactionResponse,
  GetWalletResponse,
  LoginResponse,
} from 'common/responses';
import { omit } from 'lodash';
import { cast, flow, Instance, types } from 'mobx-state-tree';
import moment from 'moment';
import { LoginFormValues } from '../components/Login/LoginForm';
import { AddTransactionValues } from '../components/Transactions/AddTransactionForm';
import { Api } from '../services/Api';
import { Rate } from './Rate';

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

export const api = new Api({
  accessToken,
  refreshToken,
});

export type Entity = 'categories' | 'wallets';

export const Store = types
  .model('Store', {
    isAuthorized: types.optional(types.boolean, !!accessToken),
    account: types.maybe(Account),
    rates: types.optional(Rate, { rates: [] }),
    currencies: types.optional(types.array(Currency), []),
    categories: types.optional(types.array(Category), []),
    wallets: types.optional(types.array(Wallet), []),
    transactions: types.optional(types.array(Transaction), []),
  })
  .actions((self) => {
    function* login(values: LoginFormValues) {
      const response = yield api.login(values.username, values.password);
      self.isAuthorized = true;
      return response as LoginResponse;
    }

    function* logout() {
      exit();
      yield api.logout();
    }

    function exit() {
      self.isAuthorized = false;
    }

    function* loadProfile() {
      const response = yield api.client.get('/profile');
      const data = response.data as GetProfileResponse;

      self.account = Account.create(data);
    }

    function* loadTransactions() {
      const response = yield api.client.get('/transactions');
      const data = response.data as GetTransactionResponse[];

      self.transactions.clear();
      for (let item of data) {
        self.transactions.push(Transaction.create(item));
      }
    }

    function* addTransaction(values: AddTransactionValues) {
      const response = yield api.client.post<{
        wallet: GetWalletResponse;
        transaction: GetTransactionResponse;
      }>('/transactions', {
        ...omit(values, ['category', 'currency']),
        amount: Number(values.amount),
        createdAt: moment().unix(),
        date: values.date.unix(),
        categoryId: values.categoryId?.id,
        currencyId: values.currencyId?.id,
      });

      const { transaction, wallet } = response.data;
      self.transactions.push(Transaction.create(transaction));
      self.wallets.remove(self.wallets.find((w) => w.id === wallet.id)!);
      self.wallets.push(Wallet.create(wallet));
    }

    function* loadCurrencies(force: boolean = false) {
      const response = yield api.client.get('/currencies');
      const data = response.data as GetCurrencyResponse[];

      if (self.currencies.length && !force) {
        return;
      }

      self.currencies.clear();
      for (let item of data) {
        self.currencies.push(Currency.create(item));
      }
    }

    function* loadWallets() {
      const response = yield api.client.get('/wallets');
      const data = response.data as GetWalletResponse[];

      self.wallets.clear();
      for (let item of data) {
        self.wallets.push(Wallet.create(item));
      }
    }

    function* loadCategories() {
      const response = yield api.client.get('/categories');
      const data = response.data as GetCategoryResponse[];

      self.categories.clear();
      for (let item of data) {
        self.categories.push(Category.create(item));
      }
    }

    function* loadRates(force: boolean = false) {
      const response = yield api.client.get('/currencies/rates');
      const data = response.data as GetRateResponse;

      if (self.currencies.length && !force) {
        return;
      }

      self.rates.rates.clear();
      for (let name in data.rates) {
        self.rates.rates.push(cast({ name, rate: data.rates[name] }));
      }

      return data;
    }

    function* init() {
      yield Promise.all([flow(loadRates)(), flow(loadCurrencies)()]);
    }

    return {
      exit,
      login: flow(login),
      loadProfile: flow(loadProfile),
      logout: flow(logout),
      loadRates: flow(loadRates),
      loadCurrencies: flow(loadCurrencies),
      loadCategories: flow(loadCategories),
      loadWallets: flow(loadWallets),
      addTransaction: flow(addTransaction),
      loadTransactions: flow(loadTransactions),
      init: flow(init),
    };
  });

export type InjectedStore = {
  store: Instance<typeof Store>;
};

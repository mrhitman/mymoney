import {
  GetCategoryResponse,
  GetCurrencyResponse,
  GetRateResponse,
  GetWalletResponse,
  LoginResponse,
} from 'common/responses';
import { uniqBy } from 'lodash';
import { cast, flow, Instance, types } from 'mobx-state-tree';
import { LoginFormValues } from '../components/Login/LoginForm';
import api from '../utils/api';
import { Category } from './category';
import { Currency } from './currency';
import { Rate } from './Rate';
import { Wallet } from './wallet';

export type Entity = 'categories' | 'wallets';

export const Store = types
  .model('Store', {
    isAuthorized: types.optional(
      types.boolean,
      !!localStorage.getItem('accessToken'),
    ),
    rates: types.optional(Rate, { rates: [] }),
    currencies: types.optional(types.array(Currency), []),
    categories: types.optional(types.array(Category), []),
    wallets: types.optional(types.array(Wallet), []),
  })
  .actions((self) => {
    function* login(values: LoginFormValues) {
      const response = yield api.login(values.username, values.password);
      self.isAuthorized = true;
      return response as LoginResponse;
    }

    function* logout() {
      localStorage.clear();
      yield api.logout();
      self.isAuthorized = false;
    }

    function* loadCurrencies(force: boolean = false) {
      const response = yield api.client.get('/currencies');
      const data = response.data as GetCurrencyResponse[];

      if (self.currencies.length && !force) {
        return;
      }

      self.currencies = cast([]);
      for (let item of uniqBy(data, 'id')) {
        self.currencies.push(
          cast({
            id: item.id,
            name: item.name,
            rate: item.rate,
          }),
        );
      }
    }

    function* loadWallets() {
      const response = yield api.client.get('/wallets');
      const data = response.data as GetWalletResponse[];

      self.wallets = cast([]);
      for (let item of data) {
        self.wallets.push(
          Wallet.create({
            id: item.id,
            name: item.name,
            description: item.description,
            type: item.type,
            pockets: item.pockets.map((p) =>
              cast({
                id: p.id,
                amount: p.amount,
                currency: p.currencyId,
              } as any),
            ),
          }),
        );
      }
    }

    function* loadCategories() {
      const response = yield api.client.get('/categories');
      const data = response.data as GetCategoryResponse[];

      self.categories = cast([]);
      for (let item of data) {
        self.categories.push(
          cast({
            id: item.id,
            name: item.name,
            type: item.type ? item.type : undefined,
            parent: item.parent ? item.parent : undefined,
          }),
        );
      }
    }

    function* loadRates(force: boolean = false) {
      const response = yield api.client.get('/currencies/rates');
      const data = response.data as GetRateResponse;

      if (self.currencies.length && !force) {
        return;
      }

      self.rates.rates = cast([]);
      for (let name in data.rates) {
        self.rates.rates.push(cast({ name, rate: data.rates[name] }));
      }

      return data;
    }

    function* init() {
      yield Promise.all([flow(loadRates)(), flow(loadCurrencies)()]);
    }

    return {
      login: flow(login),
      logout: flow(logout),
      loadRates: flow(loadRates),
      loadCurrencies: flow(loadCurrencies),
      loadCategories: flow(loadCategories),
      loadWallets: flow(loadWallets),
      init: flow(init),
    };
  });

export type InjectedStore = {
  store: Instance<typeof Store>;
};

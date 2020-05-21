import {
  GetCategoryResponse,
  GetWalletResponse,
  LoginResponse,
} from 'common/responses';
import { flow, Instance, types } from 'mobx-state-tree';
import { LoginFormValues } from '../components/Login/LoginForm';
import api from '../utils/api';

export type Entity = 'categories' | 'wallets';
export type InjectedStore = {
  store: Instance<typeof Store>;
};

export const Store = types
  .model('Store', {
    isAuthorized: types.optional(
      types.boolean,
      !!localStorage.getItem('accessToken'),
    ),
  })
  .actions((self) => {
    function* login(values: LoginFormValues) {
      const response = yield api.login(values.username, values.password);
      self.isAuthorized = true;
      return response as LoginResponse;
    }

    function* logout() {
      yield api.logout();
      self.isAuthorized = false;
    }

    function* getCategories() {
      const response = yield api.client.get('/categories');

      return response.data as GetCategoryResponse[];
    }

    function* getWallets() {
      const response = yield api.client.get('/wallets');

      return response.data as GetWalletResponse[];
    }

    return {
      login: flow(login),
      logout: flow(logout),
      getCategories: flow(getCategories),
      getWallets: flow(getWallets),
    };
  });

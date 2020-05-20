import { types, Instance } from 'mobx-state-tree';
import api from '../utils/api';
import { LoginFormValues } from '../Login/LoginForm';

export type InjectedStore = {
  store: Instance<typeof Store>;
};

export const Store = types
  .model('Store', {
    isLoggined: types.optional(types.boolean, api.isLoggined),
  })
  .actions((self) => {
    async function login(values: LoginFormValues) {
      const response = await api.login(values.username, values.password);
      self.isLoggined = true;
      return response;
    }

    async function logout() {
      await api.logout();
      self.isLoggined = false;
    }

    return {
      login,
      logout,
    };
  });

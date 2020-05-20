import { flow, Instance, types } from 'mobx-state-tree';
import { LoginFormValues } from '../Login/LoginForm';
import api from '../utils/api';

export type InjectedStore = {
  store: Instance<typeof Store>;
};

export const Store = types
  .model('Store', {
    isLoggined: types.optional(
      types.boolean,
      !!localStorage.getItem('accessToken'),
    ),
  })
  .actions((self) => {
    function* login(values: LoginFormValues) {
      const response = yield api.login(values.username, values.password);
      self.isLoggined = true;
      return response;
    }

    function* logout() {
      yield api.logout();
      self.isLoggined = false;
    }

    return {
      login: flow(login),
      logout: flow(logout),
    };
  });

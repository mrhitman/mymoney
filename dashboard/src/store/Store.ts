import { flow, Instance, types } from "mobx-state-tree";
import { GetCategoriesResponse, LoginResponse } from "common/responses";
import { LoginFormValues } from "../components/Login/LoginForm";
import api from "../utils/api";

export type InjectedStore = {
  store: Instance<typeof Store>;
};

export const Store = types
  .model("Store", {
    isAuthorized: types.optional(
      types.boolean,
      !!localStorage.getItem("accessToken")
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
      const response = yield api.client.get("/categories");

      return response.data as GetCategoriesResponse;
    }

    return {
      login: flow(login),
      logout: flow(logout),
      getCategories: flow(getCategories),
    };
  });

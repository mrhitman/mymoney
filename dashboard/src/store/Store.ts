import { Currency } from "common/currency";
import {
  GetCategoryResponse,
  GetCurrencyResponse,
  GetRateResponse,
  GetWalletResponse,
  LoginResponse,
} from "common/responses";
import { flow, Instance, types } from "mobx-state-tree";
import { LoginFormValues } from "../components/Login/LoginForm";
import api from "../utils/api";
import { Rate } from "./Rate";

export type Entity = "categories" | "wallets";
export type InjectedStore = {
  store: Instance<typeof Store>;
};

export const Store = types
  .model("Store", {
    isAuthorized: types.optional(
      types.boolean,
      !!localStorage.getItem("accessToken")
    ),
    rates: types.optional(Rate, { rates: [] }),
    currencies: types.optional(types.array(Currency), []),
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

    function* getCategories() {
      const response = yield api.client.get("/categories");

      return response.data as GetCategoryResponse[];
    }

    function* getWallets() {
      const response = yield api.client.get("/wallets");

      return response.data as GetWalletResponse[];
    }

    function* loadCurrencies() {
      const response = yield api.client.get("/currencies");

      return response.data as GetCurrencyResponse[];
    }

    function* loadRates() {
      const response = yield api.client.get("/currencies/rates");

      const data = response.data as GetRateResponse;

      for (let name in data.rates) {
        self.rates.rates.push({ name, rate: data.rates[name] });
      }

      return data;
    }

    function* init() {
      yield Promise.all([flow(loadRates)(), flow(loadCurrencies)()]);
    }

    return {
      login: flow(login),
      logout: flow(logout),
      getCategories: flow(getCategories),
      getWallets: flow(getWallets),
      loadRates: flow(loadRates),
      loadCurrencies: flow(loadCurrencies),
      init: flow(init),
    };
  });

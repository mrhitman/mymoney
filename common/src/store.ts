import { types } from "mobx-state-tree";
import { Account } from "./account";
import { Category } from "./category";
import { Currency } from "./currency";
import { Wallet } from "./wallet";

export const Store = types.model("Store", {
  account: types.maybe(Account),
  wallets: types.optional(types.array(Wallet), []),
  categories: types.optional(types.array(Category), []),
  currencies: types.optional(types.array(Currency), []),
});

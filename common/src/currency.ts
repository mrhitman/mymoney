import { types } from "mobx-state-tree";

export const Currency = types.model("Currency", {
  id: types.identifier,
  name: types.string,
  description: types.maybeNull(types.string),
  symbol: types.maybe(types.string),
  flagCode: types.maybeNull(types.string),
  rate: types.maybe(types.number),
});

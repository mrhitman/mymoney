import { types } from "mobx-state-tree";

export const Currency = types
  .model("Currency", {
    id: types.identifier,
    name: types.string,
    description: types.maybeNull(types.string),
    symbol: types.maybe(types.string),
    flagCode: types.maybeNull(types.string),
    rate: types.maybe(types.number),
    CtryNm: types.maybeNull(types.string),
    CcyNm: types.maybeNull(types.string),
    CcyNbr: types.maybeNull(types.number),
    CcyMnrUnts: types.maybeNull(types.number),
  })
  .views((self) => ({
    get country() {
      return `${self.CtryNm?.slice(0, 1)}${self.CtryNm?.slice(
        1,
        (self.CtryNm || "").length
      ).toLowerCase()}`;
    },
  }));

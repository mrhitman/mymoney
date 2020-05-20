import { types } from "mobx-state-tree";

export const Store = types
  .model("Store", {
    accessToken: types.maybe(types.string),
    refreshToken: types.maybe(types.string),
  })
  .actions((self) => {
    function login() {}

    return {
      login,
    };
  });

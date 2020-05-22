import { types } from "mobx-state-tree";

export const Rate = types
  .model("Rate", {
    rates: types.array(types.model({ name: types.string, rate: types.number })),
  })
  .actions((self) => {
    function exchange(from: string, to: string, amount: number) {
      return amount;
    }

    return { exchange };
  });

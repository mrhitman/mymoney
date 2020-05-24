import { types } from 'mobx-state-tree';

export const Rate = types
  .model('Rate', {
    rates: types.array(types.model({ name: types.string, rate: types.number })),
  })
  .actions((self) => {
    function exchange(from: string, to: string, amount: number) {
      const fromCurrency = self.rates.find((r) => r.name === from);
      const toCurrency = self.rates.find((r) => r.name === to);

      if (!fromCurrency) {
        return amount;
      }

      if (!toCurrency) {
        return amount;
      }

      return (amount / fromCurrency.rate) * toCurrency.rate;
    }

    return { exchange };
  });

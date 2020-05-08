import {types, Instance} from 'mobx-state-tree';
import {Currency} from './currency';

interface UpdatePocketDto {
  amount: number;
  currency: Instance<typeof Currency>;
}

export const Pocket = types
  .model('Pocket', {
    id: types.identifier,
    amount: types.optional(types.number, 0),
    currency: types.reference(Currency),
  })
  .actions((self) => {
    function update(args: UpdatePocketDto) {
      self.amount = args.amount;
      self.currency = args.currency;
    }
    return {update};
  });

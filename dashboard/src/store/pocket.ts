import { types } from 'mobx-state-tree';
import { Currency } from './currency';

export const Pocket = types.model('Pocket', {
  id: types.identifier,
  amount: types.optional(types.number, 0),
  currency: types.reference(Currency),
});

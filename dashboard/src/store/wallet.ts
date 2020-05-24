import { types } from 'mobx-state-tree';
import { Icon } from './icon';
import { Pocket } from './pocket';

export const Wallet = types.model('Wallet', {
  id: types.identifier,
  name: types.string,
  description: types.maybe(types.string),
  cardNumber: types.maybe(types.string),
  icon: types.optional(Icon, {
    type: 'Feather',
    name: 'target',
    color: 'white',
    backgroundColor: '#ef5350',
  }),
  allowNegativeBalance: types.optional(types.boolean, true),
  type: types.string,
  pockets: types.optional(types.array(Pocket), []),
});

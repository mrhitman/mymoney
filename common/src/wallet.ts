import { types } from 'mobx-state-tree';
import { Icon } from './icon';
import { Pocket } from './pocket';
import { red400 } from './utils/colors';

export const Wallet = types
  .model('Wallet', {
    id: types.identifier,
    name: types.string,
    description: types.maybeNull(types.string),
    cardNumber: types.maybeNull(types.string),
    icon: types.optional(Icon, {
      type: 'Feather',
      name: 'target',
      color: 'white',
      backgroundColor: red400,
    }),
    allowNegativeBalance: types.optional(types.boolean, true),
    type: types.string,
    pockets: types.optional(types.array(Pocket), []),
    createdAt: types.Date,
  })
  .preProcessSnapshot((snapshot: any) => {
    return { ...snapshot, createdAt: new Date(snapshot.createdAt) };
  });

import {types} from 'mobx-state-tree';
import {Colors} from 'react-native-ui-lib';
import {Icon} from './icon';
import {Pocket} from './pocket';

export enum WalletTypes {
  credit = 'credit',
  goal = 'goal',
  dept = 'dept',
  visa = 'visa',
  master = 'master',
  fiat = 'fiat',
}

export const Wallet = types.model('Wallet', {
  id: types.identifier,
  name: types.string,
  description: types.maybe(types.string),
  cardNumber: types.maybe(types.string),
  icon: types.optional(Icon, {
    type: 'Feather',
    name: 'target',
    color: 'white',
    backgroundColor: Colors.red400,
  }),
  allowNegativeBalance: types.optional(types.boolean, true),
  type: types.enumeration(Object.keys(WalletTypes)),
  pockets: types.optional(types.array(Pocket), []),
});

import {types} from 'mobx-state-tree';
import {Colors} from 'react-native-ui-lib';
import {IconType} from '../misc/Icon';

export const Icon = types.model('Icon', {
  name: types.string,
  type: types.enumeration(Object.keys(IconType)),
  color: types.optional(types.string, Colors.black),
  backgroundColor: types.optional(types.string, Colors.white),
});

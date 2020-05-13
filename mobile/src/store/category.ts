import {types} from 'mobx-state-tree';
import {IconType} from '../misc/Icon';
import {Icon} from './icon';
import {CategoryType} from './types/category';

export const Category = types.model('Category', {
  id: types.identifier,
  name: types.string,
  description: types.optional(types.string, ''),
  fixed: types.optional(types.boolean, false),
  type: types.optional(
    types.enumeration(Object.keys(CategoryType)),
    CategoryType.outcome,
  ),
  icon: types.optional(Icon, {
    name: 'piggy-bank',
    type: IconType.FontAwesome5,
  }),
  parent: types.maybe(types.reference(types.late(() => Category))),
});

import { IAnyType, Instance, types } from 'mobx-state-tree';
import { Icon } from './icon';

export const Category = (types
  .model('Category', {
    id: types.identifier,
    name: types.string,
    description: types.optional(types.string, ''),
    isFixed: types.optional(types.boolean, false),
    type: types.optional(
      types.enumeration(['income', 'outcome', 'transfer']),
      'outcome'
    ),
    icon: types.optional(Icon, {
      name: 'piggy-bank',
      type: 'FontAwesome5',
    }),
    parent: types.maybeNull(types.reference(types.late(() => Category))),
    createdAt: types.optional(types.Date, new Date()),
    deletedAt: types.maybeNull(types.Date),
    updatedAt: types.maybeNull(types.Date),
    syncAt: types.maybeNull(types.Date),
  })
  .preProcessSnapshot((snapshot: any) => {
    return {
      id: snapshot.id,
      name: snapshot.name,
      type: snapshot.type || 'outcome',
      isFixed: snapshot.isFixed || false,
      description: snapshot.description || '',
      icon: {
        name: snapshot.icon?.name || 'piggy-bank',
        type: snapshot.icon?.type || 'FontAwesome5',
        backgroundColor: snapshot.icon?.backgroundColor || 'black',
      },
    };
  }) as any) as CategoryLike;

interface CategoryLike extends IAnyType {
  id: string;
  name: string;
  description: string;
  isFixed: boolean;
  type: string;
  icon: Instance<typeof Icon>;
  parent: CategoryLike;
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  syncAt: Date;
}

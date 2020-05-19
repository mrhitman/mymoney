import {NavigationContainer} from '@react-navigation/native';
import {Category} from 'common/category';
import {Icon} from 'common/icon';
import {Store} from 'common/store';
import {IconType} from 'common/types/icon';
import {Provider} from 'mobx-react';
import {Instance} from 'mobx-state-tree';
import React, {PureComponent} from 'react';
import './i18n';
import BottomNavigator from './navigation/BottomNavigator';
import {Init} from './Theme';
import {defaultCategories} from './utils/categories';

console.disableYellowBox = true;

const store: Instance<typeof Store> = Store.create({
  categories: defaultCategories.map((dc) =>
    Category.create({
      id: dc.id,
      name: dc.name,
      type: dc.type,
      icon: Icon.create({
        type: dc.icon?.type || IconType.AntDesign,
        name: dc.icon?.name || 'wallet',
        backgroundColor: dc.icon?.backgroundColor || 'black',
      }),
      parent: dc.parentId,
    }),
  ),
});

class MyMoneyApp extends PureComponent {
  public componentDidMount() {
    Init('dark');
  }

  public render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <BottomNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default MyMoneyApp;

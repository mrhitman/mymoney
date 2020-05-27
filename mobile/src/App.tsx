import {NavigationContainer} from '@react-navigation/native';
import {Category, Icon, Store} from 'common';
import {IconType} from 'common/src/types/icon';
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

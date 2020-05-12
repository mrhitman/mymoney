import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'mobx-react';
import {Instance} from 'mobx-state-tree';
import React, {PureComponent} from 'react';
import './i18n';
import BottomNavigator from './navigation/BottomNavigator';
import {Category, defaultCategories} from './store/category';
import {Store} from './store/store';
import {Init} from './Theme';

console.disableYellowBox = true;

const store: Instance<typeof Store> = Store.create({
  categories: defaultCategories.map((dc) =>
    Category.create({
      id: dc.id,
      name: dc.name,
      type: dc.type,
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

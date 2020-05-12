import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'mobx-react';
import {Instance} from 'mobx-state-tree';
import React, {PureComponent} from 'react';
import BottomNavigator from './navigation/BottomNavigator';
import {Store} from './store/store';
import {Init} from './Theme';

console.disableYellowBox = true;
const store: Instance<typeof Store> = Store.create({});

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

import {NavigationContainer} from '@react-navigation/native';
import React, {PureComponent} from 'react';
import BottomNavigator from './navigation/BottomNavigator';
import {Init} from './Theme';

console.disableYellowBox = true;

class MyMoneyApp extends PureComponent {
  public componentDidMount() {
    Init('dark');
  }

  public render() {
    return (
      <NavigationContainer>
        <BottomNavigator />
      </NavigationContainer>
    );
  }
}

export default MyMoneyApp;

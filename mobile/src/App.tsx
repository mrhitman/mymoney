import {NavigationContainer} from '@react-navigation/native';
import React, {PureComponent} from 'react';
import BottomNavigator from './navigation/BottomNavigator';
import './Theme';

console.disableYellowBox = true;

class MyMoneyApp extends PureComponent {
  public render() {
    return (
      <NavigationContainer>
        <BottomNavigator />
      </NavigationContainer>
    );
  }
}

export default MyMoneyApp;

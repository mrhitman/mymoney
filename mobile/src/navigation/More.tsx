import {createStackNavigator} from '@react-navigation/stack';
import React, {FC} from 'react';
import AccountSettings from '../pages/AccountSettings/AccountSettings';
import Categories from '../pages/Categories/Categories';
import Currencies from '../pages/Currencies/Currencies';
import MorePage from '../pages/More/More';

const Stack = createStackNavigator();

const More: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="More" component={MorePage} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Currencies" component={Currencies} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
    </Stack.Navigator>
  );
};

export default More;

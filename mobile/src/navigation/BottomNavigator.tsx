import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import Icon from '../misc/Icon';
import Analytics from '../pages/Analytics';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import Transactions from '../pages/Transactions';
import {IconType} from '../misc/Icon';

const Tab = createBottomTabNavigator();

const BottomNavigator: FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Accounts',
          tabBarIcon: ({color, size}) => (
            <Icon
              type={IconType.MaterialIcons}
              name="credit-card"
              color={color}
              size={size}
            />
          ),
        }}
        name="accounts"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({color, size}) => (
            <Icon
              type={IconType.FontAwesome}
              name="exchange"
              color={color}
              size={size}
            />
          ),
        }}
        name="transactions"
        component={Transactions}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({color, size}) => (
            <Icon
              type={IconType.AntDesign}
              name="linechart"
              color={color}
              size={size}
            />
          ),
        }}
        name="analytics"
        component={Analytics}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color, size}) => (
            <Icon
              type={IconType.MaterialIcons}
              name="dehaze"
              color={color}
              size={size}
            />
          ),
        }}
        name="more"
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

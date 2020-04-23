import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import Icon from '../misc/Icon';
import Home from '../pages/Home';
import Settings from '../pages/Settings';

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
              type="MaterialIcons"
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
          tabBarLabel: 'Operations',
          tabBarIcon: ({color, size}) => (
            <Icon
              type="FontAwesome"
              name="exchange"
              color={color}
              size={size}
            />
          ),
        }}
        name="operations"
        component={Settings}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Analytics',
          tabBarIcon: ({color, size}) => (
            <Icon type="AntDesign" name="linechart" color={color} size={size} />
          ),
        }}
        name="analytics"
        component={Settings}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color, size}) => (
            <Icon
              type="MaterialIcons"
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

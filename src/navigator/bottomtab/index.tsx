import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/home';
import {ScreenNames} from '../screenNames';
import Profile from '../../screens/profile';
import Favourite from '../../screens/favourite';
import Account from '../../screens/account';
import Menu from '../../screens/menu';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={Home}
        name={ScreenNames.Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        component={Account}
        name={ScreenNames.Account}
        options={{headerShown: false}}
      />
      <Tab.Screen
        component={Favourite}
        name={ScreenNames.Favourite}
        options={{headerShown: false}}
      />
      <Tab.Screen
        component={Menu}
        name={ScreenNames.Menu}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/home';
import {ScreenNames} from '../screenNames';
import Profile from '../../screens/profile';
import Favourite from '../../screens/favourite';
import Account from '../../screens/account';
import Menu from '../../screens/menu';
import { Image,StyleSheet } from 'react-native';
import { Images } from '../../assets';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={Home}
        name={ScreenNames.Home}
        options={{headerShown: false,

          tabBarIcon: () => {
            return (
              <Image
                source={Images.home}
                style={styles.icon}
              />
            );
          },
        }}
      
      />
      <Tab.Screen
        component={Account}
        name={ScreenNames.Account}
        options={{headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                source={Images.account}
                style={styles.icon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={Favourite}
        name={ScreenNames.Favourite}
        options={{headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                source={Images.favourite}
                style={styles.icon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        component={Menu}
        name={ScreenNames.Menu}
        options={{headerShown: false,
          tabBarIcon: () => {
            return (
              <Image
                source={Images.menus}
                style={styles.icon}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
})
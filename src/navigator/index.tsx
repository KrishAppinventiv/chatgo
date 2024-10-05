import React from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import {ScreenNames} from './screenNames';
import BottomTabNavigator from './bottomtab';
import SplashScreen from '../screens/splashScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import {View, Text} from 'react-native';
import Chat from '../screens/chatScreen';
import Search from '../screens/search';

const Stack: any = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          component={SplashScreen}
          name={ScreenNames.Splash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={BottomTabNavigator}
          name={ScreenNames.BottomTab}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={Chat}
          name={ScreenNames.Chat}
          options={{headerShown: false}}
        />


<Stack.Screen
          component={Search}
          name={ScreenNames.Search}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <View><Text>Helooooooo</Text></View>
  );
};

export default RootNavigator;

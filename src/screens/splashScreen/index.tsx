import {View, Text, Animated, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Images} from '../../assets';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../navigator/screenNames';

const SplashScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation: any = useNavigation();
  const viewAnimate = () =>
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();

  const navigateTo = (screenNames: any, params?: any) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: screenNames, params}],
      }),
    );
  };
  useEffect(() => {
    viewAnimate();
    setTimeout(() => {
      if (true) {
        // navigation.navigate(ScreenNames.BottomTab);
        navigateTo(ScreenNames.BottomTab);
        // navigateTo(ScreenNames.BottomTab, {screen: ScreenNames.Profile});
      }
    }, 1100);
  }, []);
  return (
    <Animated.View
      style={[styles.container, {opacity: fadeAnim}]}
      testID="splash">
      <Image
        resizeMethod="resize"
        style={styles.imageStyle}
        source={Images.splash_img}
      />
    </Animated.View>
    // <View><Text>Krishna</Text></View>
  );
};

export default SplashScreen;

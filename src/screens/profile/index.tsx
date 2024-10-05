import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import styles from '../home/styles';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../navigator/screenNames';

const Profile = () => {
  const navigation: any = useNavigation();
  const navigate = () => {
    navigation.navigate('Home');
  };
  return (
    // <SafeAreaView style={style.root}>
      <View style={style.redBox} />
      <View style={style.yellowBox} />
      <View style={style.greenBox} />
    // </SafeAreaView>
  );
};

export default Profile;

const style = StyleSheet.create({
  root: {flex: 1, flexDirection: 'row', alignItems: 'center'},
  redBox: {width: 50, height: 50, backgroundColor: 'red'},
  yellowBox: {width: 50, height: 50, backgroundColor: 'yellow'},
  greenBox: {width: 50, height: 50, backgroundColor: 'green'},
});

import {StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {GiftedChat} from 'react-native-gifted-chat';
import { Images } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../navigator/screenNames';


const Chat = ({ route }) => {

  const { name, profileImg } = route.params || {};
  const [msgs, setMsgs] = useState([
    {
      _id: '22db68ad-0865-4cdf-934c-e3df2',
      text: 'right user',
      user: {_id: 1},
    },
    {
      _id: '22db68ad-0865-4cdf-934c-e3df2c4bed4d',
      text: 'right user',
      user: {_id: 1},
    },
    {
      _id: '22db68ad-0865-4cdf-934c-e3df2c4b',
      text: 'left user',
      user: {_id: 2},
    },
    {
      _id: '22db68ad-0865-4cdf-934c-e3df2c',
      text: 'left user',
      user: {_id: 2},
    },
    {
      _id: '22db68ad-0865-4cdf-934c-e3df2c4bed4',
      text: 'left user',
      user: {_id: 2},
    },
  ]);

  const navigation = useNavigation();

  return (
    <SafeAreaProvider style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
        
          flex:0.15,
          justifyContent:'center'
         
        }}>
          <View style={{flexDirection: 'row',marginTop:30,marginHorizontal:20,justifyContent:'space-between'}}>
          <View style={{flexDirection:'row'}}>

            <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.Search)}>
            <Image source={Images.back} style={{height:30,width:30,marginTop:10,marginRight:20}}/>
            </TouchableOpacity>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            backgroundColor: '#2A7BBB',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
           {profileImg}
          </Text>
        </View>
        

        <View style={{marginTop:10}}>
        <Text style={{fontSize: 16, marginLeft:10}}>{name}</Text>
        <Text style={{fontSize: 13, marginTop:6,marginLeft:10,color:'#b8bdc2'}}>Clocked In</Text>
        </View>


        </View>

        <Image source={Images.menu} style={{height:22,width:22,marginTop:10,marginRight:20}}/>


        </View>
      </View>
      <View style={{paddingBottom: 40, flex: 0.85}}>
        <GiftedChat
          messages={msgs}
          onSend={messages => {
            console.log('messages', messages);
            setMsgs(prev => GiftedChat.append(prev, messages));
          }}
          user={{
            _id: 1,
          }}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6EDF3',
   
  },
});

// <GiftedChat
//   messages={msgs}
//   onSend={messages => {
//     setMsgs(prev => GiftedChat.append(prev, messages));
//   }}
//   user={{
//     _id: 1,
//   }}
// />

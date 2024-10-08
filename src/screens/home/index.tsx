import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import styles from './styles';
import strings from '../../utils/string';
import {ScreenNames} from '../../navigator/screenNames';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets';

import Contacts from 'react-native-contacts';
import {db} from '../../firebaseConfig';
import {collection, getDocs} from 'firebase/firestore';
import { colors } from '../../theme';

interface CustomContact {
  recordID: string;
  displayName: string;
  givenName?: string;
  familyName?: string;
  phoneNumbers?: {label?: string; number: string}[];
  emailAddresses?: {label?: string; email: string}[];
}

interface User {
  id: string;
  _name: string;
  profileImg?: string;
  color: string;
}

const Home = () => {
  const navigation: any = useNavigation();
  const navigate = () => {
    navigation.navigate(ScreenNames.Profile);
  };

  const searchInputRef = useRef<TextInput | null>(null);
  const [modalVisible2, setmodalVisible2] = useState(false);
  const [contacts, setContacts] = useState<CustomContact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'messages'));
        const messagesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // const users = messagesList
        //   .map(message => message.user)
        //   .filter(
        //     (user, index, self) =>
        //       index === self.findIndex(u => u._id === user._id),
        //   );

        console.log('Fetched messages: ', messagesList);
        console.log('Unique users: ', users);
        setUsers(messagesList);
      } catch (error) {
        console.error('Error fetching messages: ', error);
      }
    };

    fetchMessages();
  }, []);

  const filteredUsers = users.filter(
    user =>
      user.user && 
    user.user._name &&
    user.user._name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log('Filtered users: ', filteredUsers);

  const startChat = (userId, userName, img,colors) => {
    navigation.navigate('Chat', {
      id: userId,
      name: userName,
      profileImg: img,
      color: colors
    });
  };

  return (
    <View style={styles.main}>
      <View style={styles.red}>
        <View style={styles.aboveContain}>
          <View>
            <Text style={styles.msgText}>Messages</Text>
            <Text style={styles.contText}>{filteredUsers.length} Contacts</Text>
          </View>

          <TouchableOpacity onPress={() => setmodalVisible2(true)}>
            <View style={styles.addContain}>
              <Image source={Images.add} style={styles.addImg} />
            </View>
          </TouchableOpacity>
        </View>

        <View></View>
      </View>

      <View style={styles.searchContain}>
        <TouchableOpacity>
          <Image source={Images.search} style={styles.searchImg} />
        </TouchableOpacity>

        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search messages.."
          placeholderTextColor="#A9A9A9"
          onChangeText={setSearchQuery}
        />
      </View>
{filteredUsers.length === 0 ? <View style={{justifyContent:'center',flex:1,alignItems:'center'}}><Text>No Contact Found</Text></View>:  
 <FlatList
  data={filteredUsers}
  keyExtractor={item => item._id}
  showsVerticalScrollIndicator={false}
  renderItem={({item}) => (
    <TouchableOpacity
      onPress={() => startChat(item.user._id, item.user._name, item.user._profileImg,item.user.color)}>
      <View style={styles.list}>
        <View style={{flexDirection:'row'}}>
        <View style={[styles.listContain,{backgroundColor:`${item.user.color}`}]}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              textAlign: 'center',
            }}>
            {item.user._profileImg}
          </Text>
        </View>
        <View style={{marginLeft:10}}>
          <Text style={styles.Chattext}>{item.user._name}</Text>
          <Text style={styles.Chat}>{item.text}</Text>
        </View>
        </View>

        <View><Text style={{color:'#888888'}}>02:58 AM</Text></View>
      </View>
    </TouchableOpacity>
  )}
  ListEmptyComponent={
    <View style={styles.nochat}>
      <Image source={Images.fill} style={styles.fillImg} />
      <Text style={styles.noText}>No chats, yet!</Text>
      <TouchableOpacity>
        <View style={styles.startBtn}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Start Chat
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  }
  style={styles.flatStyle}
/>}
    

      <Modal
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setmodalVisible2(false);
        }}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setmodalVisible2(false)}>
          <View style={styles.introContainers}>
            <TouchableOpacity
              onPress={() => (
                setmodalVisible2(false), navigation.navigate(ScreenNames.Search)
              )}>
              <View style={styles.Contain}>
                <Image source={Images.chat} />
                <Text style={{fontSize: 17, marginLeft: 10}}>New Chat</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setmodalVisible2(false);
              }}>
              <View style={styles.Contain}>
                <Image source={Images.group} />
                <Text style={{fontSize: 17, marginLeft: 10}}>
                  New Group Chat
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // setGender('Male');
                setmodalVisible2(false);
              }}>
              <View style={styles.Contain}>
                <Image source={Images.announce} />
                <Text style={styles.announceText}>New Announcement</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Home;

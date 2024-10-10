import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import styles from './styles';
import strings from '../../utils/string';
import {ScreenNames} from '../../navigator/screenNames';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets';

import {db} from '../../firebaseConfig';
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import {colors} from '../../theme';

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

  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (querySnapshot) => {
      const messagesList: User[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Fetched users with messages: ', messagesList);
      setUsers(messagesList);
      setLoading(false); 
    }, (error) => {
      console.error('Error fetching messages: ', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  
  const filteredUsers = users.filter(user => 
    user.user && 
    user.user._name && 
    user.user._name.toLowerCase().includes(searchQuery.toLowerCase())
  ).map(user => ({
    ...user,
    lastMessage: user.messages[user.messages.length - 1], 
    
    
     
    
  }));

  console.log('Filtered users: ', filteredUsers);

  const startChat = (
    userId: string,
    userName: string,
    img: any,
    colors: string,
  ) => {
    navigation.navigate('Chat', {
      id: userId,
      name: userName,
      profileImg: img,
      color: colors,
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
      
      <FlatList
        data={filteredUsers}
        contentContainerStyle={{
          justifyContent: filteredUsers.length > 0 ? 'flex-start' : 'center',
          alignItems: filteredUsers.length > 0 ? 'stretch' : 'center',
          flex: 1,
        }}
        keyExtractor={item => item.user._id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          
          <TouchableOpacity
            onPress={() =>
              startChat(
                item.user._id,
                item.user._name,
                item.user._profileImg,
                item.user.color,
              )
            }>

              
            <View style={styles.list}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={[
                    styles.listContain,
                    {backgroundColor: `${item.user.color}`},
                  ]}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    {item.user._profileImg}
                  </Text>
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.Chattext}>{item.user._name}</Text>
                  <Text style={styles.Chat}>{item.lastMessage?.text}</Text>
                </View>
              </View>
            
              <View>
                <Text style={{color: '#888888'}}>{new Date(item.lastMessage?.createdAt? item.lastMessage.createdAt.toDate() : new Date() ).toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
})}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.nochat}>
              <Image source={Images.fill} style={styles.fillImg} />
              <Text style={styles.noText}>
                {searchQuery?.length > 0 ? 'No result found' : 'No chats, yet!'}
              </Text>
              {searchQuery?.length < 1 && (
                <TouchableOpacity>
                  <View style={styles.startBtn}>
                    <Text
                      style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                      Start Chat
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View
              style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
              <ActivityIndicator size="large" color="#2A7BBB" />
            </View>
          )
        }
        style={styles.flatStyle}
      />

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

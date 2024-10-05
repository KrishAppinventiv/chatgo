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
import React, {useState, useRef} from 'react';
// import styles from './styles';
import strings from '../../utils/string';
import {ScreenNames} from '../../navigator/screenNames';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets';

import Contacts from 'react-native-contacts';

interface CustomContact {
  recordID: string;
  displayName: string;
  givenName?: string;
  familyName?: string;
  phoneNumbers?: {label?: string; number: string}[];
  emailAddresses?: {label?: string; email: string}[];
}

const Home = () => {
  const navigation: any = useNavigation();
  const navigate = () => {
    // navigation.navigate(ScreenNames.BottomTab, {screen: ScreenNames.Profile});
    navigation.navigate(ScreenNames.Profile);
  };

  const searchInputRef = useRef<TextInput | null>(null);
  const [modalVisible2, setmodalVisible2] = useState(false);
  const [contacts, setContacts] = useState<CustomContact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPress, setSearchPress] = useState(false);

  const handleNewChat = async () => {
    setmodalVisible2(false);
   
    const isSimulator = __DEV__;

    if (isSimulator) {
      // Use mock data if on a simulator
      const mockContacts = [
        {
          recordID: '1',
          displayName: 'John Doe',
          phoneNumbers: [{number: '123-456-7890'}],
        },
        {
          recordID: '2',
          displayName: 'Jane Smith',
          phoneNumbers: [{number: '098-765-4321'}],
        },
      ];
      setContacts(mockContacts as CustomContact[]);

      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
      return;
    }

    setTimeout(async () => {
      if (!Contacts) {
        console.error('Contacts module is not available');
        return;
      }

      try {
        // Check for permission
        const granted = await Contacts.checkPermission();
        if (granted === 'denied') {
          const permission = await Contacts.requestPermission();
          if (permission !== 'authorized') {
            console.error('Permission not granted');
            return; // Handle permission not granted
          }
        }

        // Fetch contacts
        const contacts = await Contacts.getAll();
        setContacts(contacts as CustomContact[]); // Cast to CustomContact[]
        if (searchInputRef.current) {
          searchInputRef.current.focus(); // Focus the TextInput
        }
      } catch (e) {
        console.error('Failed to fetch contacts:', e);
      }
    }, 100);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.main}>
      <View style={styles.red}>
        <View
          style={{
            marginHorizontal: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 43,
          }}>
          <View>
            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
              Messages
            </Text>
            <Text style={{fontSize: 15, color: 'white', fontWeight: '500'}}>
              45 Contacts
            </Text>
          </View>

          <TouchableOpacity onPress={() => setmodalVisible2(true)}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: '#D9D9D91A',
                justifyContent: 'center',
              }}>
              <Image
                source={Images.add}
                style={{height: 25, width: 25, alignSelf: 'center'}}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View></View>
      </View>

      <View style={styles.searchContain}>
        <TouchableOpacity>
          <Image
            source={Images.search}
            style={{height: 30, width: 30, marginStart: 5}}
          />
        </TouchableOpacity>

        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search messages.."
          placeholderTextColor="#A9A9A9"
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={Images.fill}
          style={{opacity: 0.2, height: 22, width: 22, marginBottom: 34}}
        />
        <Text style={{color: '3A4F5F', fontSize: 18, fontWeight: '600'}}>
          No chats, yet!
        </Text>
        <TouchableOpacity>
          <View
            style={{
              height: 60,
              width: 150,
              backgroundColor: '#2A7BBB',
              borderRadius: 10,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
              Start Chat
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* {searchQuery && filteredContacts.length > 0 ? (
        <FlatList
          data={filteredContacts}
          keyExtractor={item => item.recordID}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNames.Chat);
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'grey',
                  }}></View>
                <View>
                  <Text style={{fontSize: 16, padding: 10}}>
                    {item.displayName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          style={{marginTop: 20}}
        />
      ) : searchQuery && (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          No contacts found.
        </Text>
      )} */}

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
            <TouchableOpacity onPress={() => (
              setmodalVisible2(false),
              navigation.navigate(ScreenNames.Search)
              )}>
              <View style={styles.Contain}>
                <Image source={Images.chat} />
                <Text style={{fontSize: 17, marginLeft: 10}}>New Chat</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // setGender('Female');
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
                <Text style={{fontSize: 17, marginLeft: 10}}>
                  New Announcement
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#E6EDF3'},
  red: {flex: 0.19, backgroundColor: '#2A7BBB', justifyContent: 'center'},
  searchContain: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    marginStart: 20,
    marginEnd: 20,

    backgroundColor: 'white',
    borderRadius: 8,

    marginTop: 20,
  },
  searchInput: {
    marginStart: 10,
    width: '80%',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  introContainers: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    // height: SCREEN_HEIGHT*0.8099,
    backgroundColor: '#F6F9FA',

    // zIndex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
  },

  Contain: {
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E9EE',
    flexDirection: 'row',
    paddingVertical: 25,
  },
});

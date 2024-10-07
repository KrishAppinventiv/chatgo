import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../navigator/screenNames';
import Contacts from 'react-native-contacts';
import Data from '/Users/ai/Chatgo/src/data.json';
import styles from './styles';

interface CustomContact {
  name: string;
  phoneNumber: string;
  profileImg: string;
  id: number;
}

const Search = () => {
  const navigation: any = useNavigation();
  const searchInputRef = useRef<TextInput | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<CustomContact[]>([]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const handleNewChat = async () => {
    const isSimulator = __DEV__;

    if (isSimulator) {
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
      setContacts(Data as CustomContact[]);

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
            return;
          }
        }

        // Fetch contacts
        const contacts = await Contacts.getAll();
        setContacts(Data as CustomContact[]);
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      } catch (e) {
        console.error('Failed to fetch contacts:', e);
      }
    }, 100);
  };
  useEffect(() => {
    handleNewChat();
  }, []);
  console.log(contacts);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <View style={styles.radius}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={Images.arrow} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContain}>
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search here.."
            placeholderTextColor="#A9A9A9"
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={searchQuery ? filteredContacts : contacts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.Chat, {
                name: item.name,
                profileImg: item.profileImg,
                id: item.id,
              });
            }}>
            <View style={styles.list}>
              <View style={styles.listContain}>
                <Text style={styles.circleText}>{item.profileImg}</Text>
              </View>
              <View>
                <Text style={styles.chatName}>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        style={{marginTop: 20}}
      />

      {searchQuery && filteredContacts.length === 0 && (
        <View>
          <Text style={styles.noresult}>No Result Found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;

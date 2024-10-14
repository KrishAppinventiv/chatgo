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
  color: string;
}

const Search = () => {
  const navigation: any = useNavigation();
  const searchInputRef = useRef<TextInput | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<CustomContact[]>([]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  console.log("listing contacts :", contacts);
  const handleNewChat = async () => {
   
    const isSimulator = __DEV__;
   
    if (isSimulator) {
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
        const granted = await Contacts.checkPermission();
       
        if (granted === 'denied') {
          const permission = await Contacts.requestPermission();
          if (permission !== 'authorized') {
            console.error('Permission not granted');
            return;
          }
        }

        const contacts = await Contacts.getAll();
        const formattedContacts = contacts.map(contact => ({
          recordID: contact.recordID,
          displayName: contact.displayName,
          givenName: contact.givenName,
          familyName: contact.familyName,
          phoneNumbers: contact.phoneNumbers,
          emailAddresses: contact.emailAddresses,
        }));
  
       console.log("Device Contact",formattedContacts);
        setContacts(formattedContacts);
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
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.Chat, {
                name: item.name,
                profileImg: item.profileImg,
                id: item.id,
                color: item.color,
              });
            }}>
            <View style={styles.list}>
              <View
                style={[
                  styles.listContain,
                  {backgroundColor: `${item.color}`},
                ]}>
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

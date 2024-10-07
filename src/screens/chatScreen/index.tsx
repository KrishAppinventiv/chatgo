import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GiftedChat} from 'react-native-gifted-chat';
import {Images} from '../../assets';

import {useNavigation, useRoute} from '@react-navigation/native';
import {addDoc, collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../firebaseConfig';
import ChatModal from '../../components/chatModal';
import ChatModalLongPress from '../../components/chatModalLongPress';
import styles from './styles';


interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    _name: string;
    _profileImg: string;
  };
}

const Chat = () => {
  const {name, profileImg, id} = useRoute().params || {};

  const [msgs, setMsgs] = useState<Message[]>([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isModalVisible1, setisModalVisible1] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const navigation = useNavigation();
  console.log("name:",name);
  console.log("id:",id);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'messages'),
      snapshot => {
        const messages = snapshot.docs
          .map(doc => {
            const data = doc.data();
            return {
              _id: doc.id,
              text: data.text,
              createdAt: data.createdAt ? data.createdAt.toDate() : new Date(), // Convert Firestore Timestamp to Date
              user: data.user,
            };
          })
          .filter(message => message.user._id === id);

        messages.sort((a, b) => a.createdAt - b.createdAt);
        setMsgs(messages.reverse());
      },
      error => {
        console.error('Error fetching messages: ', error);
      },
    );

    return () => unsubscribe();
  }, [id]);

  const toggalChat = () => {
    setisModalVisible(!isModalVisible);
  };

  const toggalLongChat = () => {
    setisModalVisible1(!isModalVisible1);
  };

  const handleSend = async messages => {
    const message = messages[0];
    await addDoc(collection(db, 'messages'), {
      _id: message._id,
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: id,
        _name: name,
        _profileImg: profileImg,
      },
    });
  };



  const handleEmojiSelect = (messageId: string, emoji: string) => {
    console.log("message",messageId)
    console.log("emoji",emoji)
    setMsgs((prevMsgs) =>
      prevMsgs.map((msg) => {
        if (msg._id === messageId) {
          return {
            ...msg,
            text: `${msg.text} ${emoji}`, 
          };
        }
        return msg;
      })
    );
  };
  

  const renderMessage = props => {
    const {currentMessage} = props;
    return (
      <View>
        <Text>{currentMessage.text}</Text>
        <Text style={{fontSize: 10, color: '#b8bdc2'}}>
          {new Date(currentMessage.createdAt).toLocaleString()}{' '}
          {/* Format date */}
        </Text>
      </View>
    );
  };

  const handleLongPress = (currentMessage: any) => {
    setSelectedMessageId(currentMessage._id);
    setisModalVisible1(true);
  };
  

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.mainContain}>
        <View style={styles.blackContain}>
          <View style={styles.flexrow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Images.back} style={styles.blackbt} />
            </TouchableOpacity>
            <View style={styles.profContain}>
              <Text style={styles.profIcon}>{profileImg}</Text>
            </View>

            <View style={styles.userContain}>
              <Text style={styles.username}>{name}</Text>
              <Text style={styles.clockText}>Clocked In</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setisModalVisible(true)}>
            <Image source={Images.menu} style={styles.options} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.giftContaim}>
        <GiftedChat
          messages={msgs}
          alignTop={true}
          onLongPress={(currentMessage) => handleLongPress(currentMessage)}
          //renderInputToolbar={handleSend}
          onSend={messages => handleSend(messages)}
          user={{
            _id: id,
          }}
        />
      </View>

      <ChatModal visible={isModalVisible} ondismiss={toggalChat} />
      <ChatModalLongPress
        visible={isModalVisible1}
        ondismiss={toggalLongChat}
        selectedMessageId={selectedMessageId}
  onEmojiSelect={handleEmojiSelect}
      />
    </SafeAreaProvider>
  );
};

export default Chat;

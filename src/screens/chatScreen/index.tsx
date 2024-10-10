import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GiftedChat} from 'react-native-gifted-chat';
import {Images} from '../../assets';

import {useNavigation, useRoute} from '@react-navigation/native';
import {
  arrayUnion,
  addDoc,
  collection,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../../firebaseConfig';
import ChatModal from '../../components/chatModal';
import ChatModalLongPress from '../../components/chatModalLongPress';
import styles from './styles';
import {deleteDoc, query, orderBy, limit, doc,setDoc,getDoc} from 'firebase/firestore';

interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    _name: string;
    _profileImg: string;
  };

  emojiReactions?: Array<{emoji: string; userId: string}>;
}

const Chat = () => {
  const {name, profileImg, id, color} = useRoute().params || {};

  const [msgs, setMsgs] = useState<Message[]>([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isModalVisible1, setisModalVisible1] = useState(false);
  const [lastMessageDate, setLastMessageDate] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [firstDate, setfirstDate] = useState(true);

  const navigation = useNavigation();
  console.log('name:', name);
  console.log('id:', id);

  useEffect(() => {


    const userRef = doc(db, 'users', String(id));
    console.log("User Reference:", userRef); 
    const unsubscribe = onSnapshot(userRef, (userSnapshot) => {
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const messages = userData.messages.map(msg => ({
          ...msg,
          createdAt: msg.createdAt ? msg.createdAt.toDate() : new Date(), 
        }));
        console.log('Fetched messages:', messages);
        
        messages.sort((a, b) => a.createdAt - b.createdAt);
        setMsgs(messages.reverse());
      } else {
        console.log('No such user document!');
        setMsgs([]); 
      }
    }, (error) => {
      console.error('Error fetching user document: ', error);
    });
  
    return () => unsubscribe();
  }, [id]);
  
  const handleDelete = async (messageId: string) => {
    try {
      const userRef = doc(db, 'users', String(id));
      const userSnapshot = await getDoc(userRef);
  
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const updatedMessages = userData.messages.filter(msg => msg._id !== messageId);
  
        await updateDoc(userRef, {
          messages: updatedMessages,
        });
        console.log(`Message with id ${messageId} deleted successfully.`);
      }
    } catch (error) {
      console.error('Error deleting message: ', error);
    }
  };
  
  const toggalChat = () => {
    setisModalVisible(!isModalVisible);
  };

  const toggalLongChat = () => {
    setisModalVisible1(!isModalVisible1);
  };


  const handleSend = async (messages) => {

   
    const message = messages[0];
    console.log("Sending Message:", message);
    console.log(id)
    
    const userRef = doc(db, 'users', String(id));
    console.log("User Reference:", userRef);
    const userSnapshot = await getDoc(userRef);
    console.log(userSnapshot)
    if (userSnapshot.exists()) {
      
      await updateDoc(userRef, {
        messages: arrayUnion({
          _id: message._id,
          text: message.text,
          createdAt: new Date(),
          emojiReactions: [],
        }),
      });
    } else {
      
      await setDoc(userRef, {
        user: {
          _id: id,
          _name: name,
          _profileImg: profileImg,
          color: color,
        },
        messages: [{
          _id: message._id,
          text: message.text,
          createdAt: new Date(),
          emojiReactions: [],
        }],
      });

      
    }
  };
  

  const handleEmojiSelect = async (
    messageId: string,
    emoji: {id: string; source: any; emoji: any},
  ) => {
    console.log('message', messageId);
    console.log('emoji', emoji.emoji);

    setMsgs(prevMsgs =>
      prevMsgs.map(msg => {
        if (msg._id === messageId) {
          const updatedReactions = msg.emojiReactions || [];
          const existingReactionIndex = updatedReactions.findIndex(
            reaction => reaction.userId === id,
          );

          if (existingReactionIndex > -1) {
            updatedReactions[existingReactionIndex].emoji = emoji.emoji;
          } else {
            updatedReactions.push({emoji: emoji.emoji, userId: id});
          }

          return {
            ...msg,
            emojiReactions: updatedReactions,
          };
        }
        return msg;
      }),
    );

    try {
      await updateDoc(doc(db, 'users', String(id)), {
        emojiReactions: arrayUnion({emoji: emoji.emoji, userId: id}),
      });
      console.log(`Reaction added to message ${messageId} in Firestore.`);
    } catch (error) {
      console.error('Error updating emoji reaction in Firestore: ', error);
    }
  };

  
  const handleLongPress = (context, currentMessage) => {
    console.log('Long pressed context:', context);
    console.log('Long pressed message:', currentMessage._id);

    if (currentMessage && currentMessage._id) {
      setSelectedMessageId(currentMessage._id);
      setisModalVisible1(true);
    } else {
      console.error('No valid message ID found.');
    }
  };

  const renderMessage = props => {
    const {currentMessage,user} = props;
    console.log("Check",currentMessage)
    const currentMessageDate = new Date(
      currentMessage.createdAt,
    ).toLocaleDateString();
    console.log(new Date(currentMessage.createdAt).toLocaleTimeString())
    console.log(currentMessage.text)
    console.log(user._id)
    const today = new Date();
    const todayDate = today.toLocaleDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayDate = yesterday.toLocaleDateString();

    let displayDate;
    if (currentMessageDate === todayDate) {
      displayDate = 'Today';
    } else if (currentMessageDate === yesterdayDate) {
      displayDate = 'Yesterday';
    } else {
      displayDate = currentMessageDate;
    }
    const previousMessageDate = props.previousMessage
      ? new Date(props.previousMessage.createdAt).toLocaleDateString()
      : null;

    const showDateView =
      !previousMessageDate || previousMessageDate !== currentMessageDate;

     const timeString = new Date(currentMessage.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

    return (
      <View>
        {showDateView && (
          <View
            style={{
              backgroundColor: 'white',
              alignSelf: 'center',
              padding: 8,
              marginTop: 15,
              borderRadius: 5,
            }}>
            <Text>{displayDate}</Text>
          </View>
        )}
        <View
          style={{
            alignItems:
              user._id === id ? 'flex-end' : 'flex-start',
          }}>
          <Text style={{fontSize: 10, color: 'grey',paddingEnd:10,paddingTop:10}}>
            {timeString}
          </Text>
        </View>
        <TouchableOpacity
          onLongPress={() => handleLongPress(props, currentMessage)}
          activeOpacity={0.8}
          style={{
            alignSelf:
              user._id === id ? 'flex-end' : 'flex-start',
            backgroundColor:
              user._id === id ? '#2A7BBB' : '#ffffff',
            borderRadius: 8,
            padding: 15,
            margin: 5,
            maxWidth: '80%',
          }}>
          <Text style={{fontSize: 15, color: 'white'}}>
            {currentMessage.text}
          </Text>

          {currentMessage.emojiReactions &&
            currentMessage.emojiReactions.length > 0 && (
              <View
                style={{
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  backgroundColor: 'white',
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text style={{fontSize: 12}}>
                  {
                    currentMessage.emojiReactions[
                      currentMessage.emojiReactions.length - 1
                    ].emoji
                  }
                </Text>
              </View>
            )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.mainContain}>
        <View style={styles.blackContain}>
          <View style={styles.flexrow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={Images.back} style={styles.blackbt} />
            </TouchableOpacity>
            <View style={[styles.profContain, {backgroundColor: color}]}>
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
          onLongPress={(context, currentMessage) =>
            handleLongPress(context, currentMessage)
          }
          onSend={messages => {
            handleSend(messages);
          }}
          user={{
            _id: id,
          }}
          renderMessage={renderMessage}
        />
      </View>

      <ChatModal visible={isModalVisible} ondismiss={toggalChat} />
      <ChatModalLongPress
        visible={isModalVisible1}
        ondismiss={toggalLongChat}
        selectedMessageId={selectedMessageId}
        onEmojiSelect={handleEmojiSelect}
        onDelete={handleDelete}
      />
    </SafeAreaProvider>
  );
};

export default Chat;

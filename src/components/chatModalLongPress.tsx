import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';

import strings from '../utils/string';
import { Images } from '../assets';

console.log(Images);
const ChatModalLongPress = ({
  visible,
  ondismiss,
  selectedMessageId,
  onEmojiSelect,
  onDelete,
}: {
  visible: any;
  ondismiss: any;
  selectedMessageId: any,
  onEmojiSelect: (messageId: string, emoji: { id: string; source: any }) => void;
  onDelete: (messageId: string) => void;
}) => {
  const [isModalVisible, setisModalVisible] = useState<boolean>(visible);
  const toggleModal = () => {
    ondismiss();
  };

  const emojis = [
    { id: 'emoji1', source: Images.emoji1 , emoji :'👍'},
    { id: 'emoji2', source: Images.emoji2 , emoji :'❤️' },
    { id: 'emoji3', source: Images.emoji3 , emoji :'😂'},
    { id: 'emoji4', source: Images.emoji4 , emoji :'🎉'},
    { id: 'emoji5', source: Images.emoji5 , emoji :'👎'},
  ];


  const handleEmojiPress = (emoji: { id: string; source: any }) => {
    console.log(emoji)
    console.log(emoji.source)
    onEmojiSelect(selectedMessageId, emoji); 
    toggleModal();
  };
  return (
    <View>
      <Modal transparent={true} animationType="fade" visible={visible}>
        <Pressable onPress={toggleModal} style={styles.container}>
          <View style={styles.modalContent}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 10,
                  marginTop: 10,
                }}>
                {/* <TouchableOpacity>
                  <Image
                    style={{height: 30, width: 30}}
                    source={Images.emoji1}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={{height: 30, width: 30}}
                    source={Images.emoji2}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={{height: 30, width: 30}}
                    source={Images.emoji3}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={{height: 30, width: 30}}
                    source={Images.emoji4}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={{height: 30, width: 30}}
                    source={Images.emoji5}
                  />
                </TouchableOpacity> */}
                 {emojis.map((emoji, index) => (
                  <TouchableOpacity key={index} onPress={() => handleEmojiPress(emoji)}>
                    <Image style={{ height: 30, width: 30 }} source={emoji.source} />
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.modalButton}>
                <Image source={Images.reply} style={styles.buttonIcon} />
                <Text style={styles.modalButtonText}>{strings.chatOp1}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton}>
                <Image source={Images.forward} style={styles.buttonIcon} />
                <Text style={styles.modalButtonText}>{strings.chatOp2}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton}>
                <Image source={Images.copy} style={styles.buttonIcon} />
                <Text style={styles.modalButtonText}>{strings.chatOp3}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton}>
                <Image source={Images.star} style={styles.buttonIcon} />
                <Text style={styles.modalButtonText}>{strings.chatOp4}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton}>
                <Image source={Images.edit} style={styles.buttonIcon} />
                <Text style={styles.modalButtonText}>{strings.chatOp5}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton}  onPress={() => {
                console.log(selectedMessageId)
                  if (selectedMessageId) {
                    onDelete(selectedMessageId); 
                    toggleModal(); 
                  }
                }}>
                <Image source={Images.delete} style={styles.buttonIcon} />
                <Text style={styles.modalButtonTextDelete}>
                  {strings.chatModalButton4}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ChatModalLongPress;

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  buttonIcon: {
    height: 20,
    width: 20,
  },
  modalButtonText: {
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 8,
    color: '#6a7a86',
  },
  modalButton: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 30,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fafafa',
  },
  modalButtonTextDelete: {
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 8,
    color: 'red',
  },
});

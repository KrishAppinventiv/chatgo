import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import strings from '../utils/string'
import { Images } from '../assets'



const ChatModal = ({ visible, ondismiss }: { visible: any, ondismiss: any }) => {
    const [isModalVisible, setisModalVisible] = useState<boolean>(visible)
    const toggleModal = () => {
        ondismiss()
    };
    return (
        <View>
            <Modal
                transparent={true}
                animationType='fade'
                visible={visible}
            

            >
                <Pressable onPress={toggleModal} style={styles.container} >


                    <View style={styles.modalContent}>
                        <View style={styles.modalContainer}>

                            <TouchableOpacity style={styles.modalButton}>
                                <Image
                                    source={Images.eye}
                                    style={styles.buttonIcon}

                                />
                                <Text style={styles.modalButtonText}>
                                    {strings.chatModalButton1}
                                </Text>
                            </TouchableOpacity>



                            <TouchableOpacity style={styles.modalButton}>
                                <Image
                                    source={Images.pin}
                                    style={styles.buttonIcon}

                                />
                                <Text style={styles.modalButtonText}>
                                    {strings.chatModalButton2}
                                </Text>
                            </TouchableOpacity>




                            <TouchableOpacity style={styles.modalButton}>
                                <Image
                                    source={Images.search}
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.modalButtonText}>
                                    {strings.chatModalButton3}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton}>
                                <Image
                                    source={Images.delete}
                                    style={styles.buttonIcon}

                                />
                                <Text style={styles.modalButtonTextDelete}>
                                    {strings.chatModalButton4}
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}

export default ChatModal

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
    modalButtonTextDelete:
    {
        fontSize: 17,
        fontWeight: '600',
        paddingLeft: 8,
        color: 'red',
    },

})

import {StyleSheet} from 'react-native';
import {colors, dimension} from '../../theme';
import Data from '/Users/ai/Chatgo/src/data.json';
export default StyleSheet.create({
    noresult: {
        textAlign: 'center',
        marginTop: 20,
      },
      chatName: {
        fontSize: 16,
        padding: 10,
      },
      circleText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
      },
      listContain: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#2A7BBB',
        justifyContent: 'center',
        alignContent: 'center',
      },

      list: {
        backgroundColor: 'white',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        flexDirection: 'row',
      },
      radius: {
        borderRadius: 8,
      },
      head: {
        flexDirection: 'row',
        marginHorizontal: 20,
      },
      container: {
        flex: 1,
        backgroundColor: '#E6EDF3',
      },
      searchContain: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
        marginStart: 20,
    
        backgroundColor: 'white',
        borderRadius: 8,
      },
      searchInput: {
        marginStart: 10,
        width: '80%',
      },
})
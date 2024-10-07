import {StyleSheet} from 'react-native';
import {colors, dimension} from '../../theme';

export default StyleSheet.create({
    
    mainContain: {
    backgroundColor: 'white',
    flex:0.15,
    justifyContent:'center',
  },
  flexrow: {
    flexDirection:'row',
  },
  blackContain: {
    flexDirection: 'row',
    marginTop:30,
    marginHorizontal:20,
    justifyContent:'space-between',
  },
  blackbt: {
    height:30,
    width:30,
    marginTop:10,
    marginRight:20,
  },
  profContain: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#2A7BBB',
    justifyContent: 'center',
    alignContent: 'center',
  },
  profIcon: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  userContain: {
    marginTop:10,
  },
  username: {
    fontSize: 16,
    marginLeft:10,
  },
  clockText: {
    fontSize: 13,
    marginTop:6,
    marginLeft:10,
    color:'#b8bdc2',
  },
  options: {
    height:22,
    width:22,
    marginTop:10,
    marginRight:20,
  },
  giftContaim: {
    paddingBottom: 40,
    flex: 0.85,
  },
  container: {
    flex: 1,
    backgroundColor: '#E6EDF3',
   
  },})
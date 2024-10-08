import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  nochat: {
    flex:1,
    justifyContent:'center',
    alignSelf:'center',
  },
  flatStyle: {
    marginTop: 10,
    flex: 1,
    marginHorizontal:20,
  },
  Chattext: {
    fontSize: 16,
    paddingTop:10,
    paddingLeft:10
  },
  Chat: {
    fontSize: 13,
    paddingLeft:10,
    color:'#A9A9A9',
    marginTop:5
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
    borderBottomWidth: 2,
    borderBottomColor: '#E7EBF3',
    flexDirection: 'row',
    justifyContent:'space-between',
    borderRadius:12
  },
  announceText: {
    fontSize: 17,
    marginLeft: 10,
  },
  startBtn: {
    height: 60,
    width: 150,
    backgroundColor: '#2A7BBB',
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noText: {
    color: '3A4F5F',
    fontSize: 18,
    fontWeight: '600',
  },
  fillImg: {
    opacity: 0.2,
    height: 22,
    width: 22,
    alignSelf:'center',
    marginBottom: 34,
  },
  msgImg: {
    flex: 1,
    marginHorizontal:20
  },
  searchImg: {
    height: 30,
    width: 30,
    marginStart: 5,
  },
  addImg: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  addContain: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#D9D9D91A',
    justifyContent: 'center',
  },
  contText: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
  },
  msgText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  aboveContain: {
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 33,
  },
  main: {flex: 1, backgroundColor: '#E6EDF3'},
  red: {flex: 0.16, backgroundColor: '#2A7BBB', justifyContent: 'center'},
  searchContain: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    marginStart: 20,
    marginEnd: 20,

    backgroundColor: 'white',
    borderRadius: 8,

    marginTop: 20,
  },
  searchInput: {
    marginLeft: 5,
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
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

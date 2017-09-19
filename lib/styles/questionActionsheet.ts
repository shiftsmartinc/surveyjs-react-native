import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  caption: {
    // textAlign: 'center',
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 10,
  },
  otherTextInput: {
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 5,
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    // backgroundColor: '#ccc',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  optionContainer: {
    // width: '100%',
    margin: 10,
    // padding: 10,
    borderRadius: 10,
    // borderWidth: 1,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    alignItems: 'stretch',
  },
  optionItem: {
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  text: {
    textAlign: 'center',
  },
  cancelOption: {
    padding: 5,
  },
});

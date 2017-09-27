import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  caption: {
    // textAlign: 'center',
    // borderColor: '#000',
    // borderWidth: 1,
    // paddingLeft: 10,
    padding: 5,
    marginLeft: 5,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 3,
  },
  captionText: {
    color: colors.wechatGreen,
    textAlign: 'center',
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

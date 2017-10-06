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
    color: colors.primary,
    textAlign: 'center',
  },
  otherTextInput: {
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 5,
  },
});
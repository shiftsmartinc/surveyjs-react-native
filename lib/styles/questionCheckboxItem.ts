import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    //alignItems: 'center',
    marginTop: 1,
    marginBottom: 1,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomColor: colors.extraLightGray,
    borderBottomWidth: 1,
  },
  checkboxWrapper: {
    flexDirection: 'row',
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  checkboxChecked: {
    borderColor: colors.green,
    backgroundColor: colors.green,
  },
  checkboxText: {
    color: colors.white,
    textAlign: 'center',
  },
  checkboxTextPristine: {
    color: colors.black,
  },
  label: {
    lineHeight: 20,
  }
});

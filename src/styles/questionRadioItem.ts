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
  radio: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray,
    overflow: 'hidden',
  },
  radioChecked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  radioText: {
    //fontSize: 15,
    color: colors.white,
  },
  label: {
    lineHeight: 20,
  }
});

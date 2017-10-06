import { StyleSheet } from 'react-native';
import colors from './colors';

const paddingLeft = 10;

export default StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: paddingLeft,
  },
  error: {
    paddingLeft: paddingLeft,
    paddingRight: paddingLeft,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: colors.red,
  },
  errorText: {
    color: colors.white,
  },
  questionContent: {
    paddingLeft: paddingLeft,
    paddingRight: paddingLeft,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.white,
  },
});

import { StyleSheet } from 'react-native';
import colors from './colors';


export default StyleSheet.create({
  container: {
  },
  button: {
    padding: 5,
    marginLeft: 5,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 3,
  },
  buttonText: {
    color: colors.primary,
    textAlign: 'center',
  },
  image: {
    marginTop: 5,
    alignSelf: 'center',
  },
});

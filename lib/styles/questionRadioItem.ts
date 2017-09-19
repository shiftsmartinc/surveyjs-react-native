import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    //alignItems: 'center',
    marginTop: 1,
    marginBottom: 1,
  },
  radioWrapper: {
    flexDirection: 'row',
  },
  radio: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
  },
  radioText: {
    //fontSize: 15,
  },
  label: {
    lineHeight: 20,
  }
});

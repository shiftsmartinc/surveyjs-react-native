import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flex: 0,
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    // borderRightWidth: 0,
    alignSelf: 'flex-start',
    // justifyContent: 'center',
  },
  rateItem: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#eee',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  rateItemText: {
    marginLeft: 3,
    marginRight: 3,
  },
  lastRateItem: {
    borderRightWidth: 0,
  },
  checkedRateItem: {
    backgroundColor: '#ccc',
  }
});

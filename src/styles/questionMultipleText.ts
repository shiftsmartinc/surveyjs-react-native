import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
  },
  itemsContainer: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 2,
    borderTopColor: '#333',
  },
  itemFirst: {
    borderTopWidth: 1,
  },
  itemLabel: {
    flex: 0.25,
  },
  itemInput: {
    flex: 0.75,
    // backgroundColor: '#f00',
  },
});

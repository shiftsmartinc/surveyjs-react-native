import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flex: 0,
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    // borderRightWidth: 0,
    alignSelf: 'flex-start',
    borderRadius: 5,
    overflow: 'hidden',

  },
  rateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
    padding: 5,
    backgroundColor: colors.lightGray,
    borderRightWidth: 1,
    borderRightColor: colors.extraLightGray,
    overflow: 'hidden',
  },
  rateItemText: {
    marginLeft: 3,
    marginRight: 3,

  },
  rateItemTextChecked: {
    color: colors.white,
  },
  lastRateItem: {
    borderRightWidth: 0,
  },
  checkedRateItem: {
    backgroundColor: colors.green,
  }
});

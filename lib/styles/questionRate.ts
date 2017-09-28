import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 0,
    // borderWidth: 1,
    // borderColor: colors.lightGray,
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
    backgroundColor: colors.primary,
  }
});

import * as React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';

const TouchableWithFeedback = Platform.select({
  android: props => <TouchableNativeFeedback {...props} />,
  ios: props => <TouchableOpacity {...props} />,
});

export default TouchableWithFeedback;

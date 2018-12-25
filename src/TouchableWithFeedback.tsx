import React, { ReactNode } from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View, StyleProp, ViewStyle, TouchableWithoutFeedbackProps } from 'react-native';

interface Props extends TouchableWithoutFeedbackProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default class TouchableWithFeedback extends React.PureComponent<Props> {
  render() {
    const { children, style, ...rest } = this.props;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
      return (
        <TouchableNativeFeedback {...rest}>
          <View style={style}>
            {children}
          </View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity {...rest} style={style}>
        {children}
      </TouchableOpacity>
    );
  }
}

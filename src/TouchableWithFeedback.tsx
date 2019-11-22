import React, { ReactNode } from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View, StyleProp, ViewStyle, TouchableWithoutFeedbackProps } from 'react-native';
import { inject, observer } from 'mobx-react';

interface Props extends TouchableWithoutFeedbackProps {
  isPreview?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

@inject((store: any) => ({
  isPreview: store.model.isPreview,
}))
@observer
export default class TouchableWithFeedback extends React.PureComponent<Props> {
  render() {
    const { isPreview, children, style, ...rest } = this.props;
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
      <TouchableOpacity style={style} {...rest} disabled={isPreview}>
        {children}
      </TouchableOpacity>
    );
  }
}

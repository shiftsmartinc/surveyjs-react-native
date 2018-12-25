import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
export default class TouchableWithFeedback extends React.PureComponent {
    render() {
        const { children, style, ...rest } = this.props;
        if (Platform.OS === 'android' && Platform.Version >= 21) {
            return (<TouchableNativeFeedback {...rest}>
          <View style={style}>
            {children}
          </View>
        </TouchableNativeFeedback>);
        }
        return (<TouchableOpacity {...rest} style={style}>
        {children}
      </TouchableOpacity>);
    }
}

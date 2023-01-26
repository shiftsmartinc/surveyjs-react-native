import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View, } from 'react-native';
import { inject, observer } from 'mobx-react';
class TouchableWithFeedback extends React.Component {
    render() {
        const { isPreview, children, style, ...rest } = this.props;
        if (Platform.OS === 'android' && Platform.Version >= 21) {
            return (<TouchableNativeFeedback {...rest}>
          <View style={style}>{children}</View>
        </TouchableNativeFeedback>);
        }
        return (<TouchableOpacity style={style} {...rest} disabled={isPreview}>
        {children}
      </TouchableOpacity>);
    }
}
export default inject((store) => ({
    isPreview: store.model.isPreview,
}))(observer(TouchableWithFeedback));

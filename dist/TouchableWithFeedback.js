var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { inject, observer } from 'mobx-react';
let TouchableWithFeedback = class TouchableWithFeedback extends React.PureComponent {
    render() {
        const { isPreview, children, style, ...rest } = this.props;
        if (Platform.OS === 'android' && Platform.Version >= 21) {
            return (<TouchableNativeFeedback {...rest}>
          <View style={style}>
            {children}
          </View>
        </TouchableNativeFeedback>);
        }
        return (<TouchableOpacity style={style} {...rest} disabled={isPreview}>
        {children}
      </TouchableOpacity>);
    }
};
TouchableWithFeedback = __decorate([
    inject((store) => ({
        isPreview: store.model.isPreview,
    })),
    observer
], TouchableWithFeedback);
export default TouchableWithFeedback;

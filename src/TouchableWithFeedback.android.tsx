import React from 'react';
import { TouchableNativeFeedback } from 'react-native';

export default class TouchableWithFeedback extends React.PureComponent {
  render() {
    return <TouchableNativeFeedback {...this.props} />;
  }
}

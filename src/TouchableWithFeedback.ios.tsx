import React from 'react';
import { TouchableOpacity } from 'react-native';

export default class TouchableWithFeedback extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <TouchableOpacity {...rest}>
        {React.Children.only(children)}
      </TouchableOpacity>
    );
  }
}

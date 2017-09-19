import * as React from 'react';

import { View, Text } from 'react-native';


export interface Props {
  number: number;
  title?: string;
  name: string;
  showTitle?: boolean;
}

export default class QuestionWrapper extends React.Component<Props, any>  {
  renderComponent() {
    return null;
  }
  render() {
    const {
      number,
      title = null,
      name,
      showTitle = true,
    } = this.props;
    return (
      <View>
        {
          showTitle &&
          <Text>{number}. {title || name}</Text>
        }
        {this.props.children}
      </View>
    );
  }
}

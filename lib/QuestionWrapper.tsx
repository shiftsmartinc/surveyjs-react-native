import * as React from 'react';

import { View, Text } from 'react-native';


export interface Props {
  number: number;
  title?: string;
  name: string;
}

export default class QuestionWrapper extends React.Component<Props, any>  {
  renderComponent() {
    return null;
  }
  render() {
    const { number, title = null, name } = this.props;
    return (
      <View>
        <Text>{number}. {title || name}</Text>
        {this.props.children}
      </View>
    );
  }
}

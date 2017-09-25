import * as React from 'react';
import { TextInput } from 'react-native';

import styles, { LINE_HEIGHT } from './styles/questionText';

interface Props {
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  value: string;
  onChange: () => {};
}

export default class QuestionText extends React.Component<Props, any>{
  render() {
    const { rows = 1 } = this.props;
    return (
      <TextInput
        style={[
          styles.input,
          { minHeight: LINE_HEIGHT * rows },
        ]}
        multiline={this.props.multiline}
        value={this.props.value}
        onChangeText={this.props.onChange}
        numberOfLines={rows}
        underlineColorAndroid={'transparent'}
        blurOnSubmit={!this.props.multiline}
      />
    );
  }
}

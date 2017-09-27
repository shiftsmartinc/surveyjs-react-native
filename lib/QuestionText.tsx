import * as React from 'react';
import { TextInput, KeyboardType } from 'react-native';

import styles, { LINE_HEIGHT } from './styles/questionText';

interface Props {
  placeholder?: string;
  inputType?: string;
  multiline?: boolean;
  rows?: number;
  value: string;
  onChange(value);
}

export default class QuestionText extends React.Component<Props, any> {
  getKeyboardType = ():KeyboardType => {
    const { inputType = 'text' } = this.props;
    let keyboardType = 'default';
    switch(inputType) {
      case 'number':
        keyboardType = 'numeric';
        break;
      case 'email':
        keyboardType = 'email-address';
        break;
      default:
    }
    return keyboardType as KeyboardType;
  }

  render() {
    const { rows = 1 } = this.props;
    const keyboardType = this.getKeyboardType();
    // const keyboardType = keyboardTypeEnums[this.props.inputType || 'text'];
    return (
      <TextInput
        style={[
          styles.input,
          { minHeight: LINE_HEIGHT * rows },
        ]}
        multiline={this.props.multiline}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChangeText={this.props.onChange}
        numberOfLines={rows}
        underlineColorAndroid={'transparent'}
        blurOnSubmit={!this.props.multiline}
        keyboardType={keyboardType}
      />
    );
  }
}

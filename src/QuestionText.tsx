import React from 'react';
import { StyleSheet, TextInput, KeyboardType } from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
  input: {
    textAlignVertical: 'top',
    paddingVertical: 0,
    marginVertical: 2,
    fontSize: 16,
    lineHeight: 20,
  }
});

export interface Props {
  placeholder?: string;
  inputType?: string;
  multiline?: boolean;
  rows?: number;
  value: string;
  onChange(value);
}

export default class QuestionText extends React.Component<Props> {
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
        style={[styles.input, { minHeight: 20 * rows }]}
        multiline={this.props.multiline}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChangeText={this.props.onChange}
        numberOfLines={rows}
        placeholderTextColor={colors.lightGray}
        underlineColorAndroid={'transparent'}
        blurOnSubmit={!this.props.multiline}
        keyboardType={keyboardType}
      />
    );
  }
}

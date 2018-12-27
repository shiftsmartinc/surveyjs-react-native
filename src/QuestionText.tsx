import React from 'react';
import { StyleSheet, TextInput, KeyboardType } from 'react-native';

const styles = StyleSheet.create({
  input: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    fontSize: 15,
    height: 50,
    color: '#4471a0',
    backgroundColor: '#fff',
    shadowColor: '#e3e3e9',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
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
        style={[styles.input, { minHeight: 50 * rows }]}
        multiline={this.props.multiline}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChangeText={this.props.onChange}
        numberOfLines={rows}
        placeholderTextColor="#4471a0"
        underlineColorAndroid={'transparent'}
        blurOnSubmit={!this.props.multiline}
        keyboardType={keyboardType}
      />
    );
  }
}

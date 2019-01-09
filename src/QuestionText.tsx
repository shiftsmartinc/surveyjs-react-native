import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 24,
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
  rows?: number;
  value: string;
  onChange(value);
}

export default class QuestionText extends React.Component<Props> {
  getKeyboardType = () => {
    const { inputType = 'text' } = this.props;
    switch(inputType) {
      case 'number':
        return 'numeric';

      case 'email':
        return 'email-address';

      default:
        return 'default';
    }
  }
  render() {
    const { placeholder, value, onChange, rows = 1 } = this.props;
    const isMultiline = rows > 1;
    return (
      <TextInput
        style={[styles.input, isMultiline && { height: 19 * rows }]}
        multiline={isMultiline}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        numberOfLines={rows}
        placeholderTextColor="#4471a0"
        underlineColorAndroid={'transparent'}
        keyboardType={this.getKeyboardType()}
      />
    );
  }
}

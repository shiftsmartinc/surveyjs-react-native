import * as React from 'react';
import { Text, View } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';

import styles from './styles/questionRadioItem';

export interface Props {
  text?: string;
  value: string;
  defaultChecked?: boolean;
  checked: boolean;
  onChange?: (string) => void;
}


export default class QuestionRadioItem extends React.Component<Props, any> {

  handlePress = () => {
    const checked = !this.props.checked;
    if (checked && this.props.onChange) {
      this.props.onChange(this.props.value);
    }
  }

  render() {
    const {
      text = null,
      value,
      checked,
    } = this.props;
    const radioStyle = [
      styles.radio,
      checked ? styles.radioChecked: null,
    ];
    return (
      <TouchableWithFeedback
        onPress={this.handlePress}
      >
        <View style={styles.container}>
          <View style={radioStyle}>
            <Text style={styles.radioText}>{checked ? '✓' : ' '}</Text>
          </View>
          <Text style={styles.label}>{text || value}</Text>
        </View>
      </TouchableWithFeedback>
    );
  }
}

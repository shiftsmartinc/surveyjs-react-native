import * as React from 'react';
import { Text, View } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback.ios';

import styles from './styles/questionCheckboxItem';

interface Props {
  text?: string;
  value: string;
  defaultChecked?: boolean;
  checked: boolean;
  onChange?: (boolean, string) => void;
}


export default class QuestionCheckBoxItem extends React.Component<Props, any> {

  handlePress = () => {
    const checked = !this.props.checked;
    if (this.props.onChange) {
      this.props.onChange(checked, this.props.value);
    }
  }

  render() {
    const { text = null, value } = this.props;
    return (
      <TouchableWithFeedback
        style={styles.container}
        onPress={this.handlePress}
      >
        <View style={styles.checkbox}>
          <Text style={{ textAlign: 'center' }}>{this.props.checked ? '✓' : ' '}</Text>
        </View>
        <Text style={styles.label}>{text || value}</Text>
      </TouchableWithFeedback>
    );
  }
}

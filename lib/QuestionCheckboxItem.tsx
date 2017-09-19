import * as React from 'react';
import { Text, View } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';

import styles from './styles/questionCheckboxItem';

interface Props {
  text?: string;
  value: string;
  defaultChecked?: boolean;
  pristine?: boolean;
  checked: boolean;
  onChange?: (boolean, string) => void;
}


export default class CheckBoxItem extends React.Component<Props, any> {

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
        <View style={styles.checkboxWrapper}>
          <View style={styles.checkbox}>
            <Text style={{ textAlign: 'center' }}>
              {this.props.pristine ? '-' : this.props.checked ? '✓' : ' '}
            </Text>
          </View>
          <Text style={styles.label}>{text || value}</Text>
        </View>
      </TouchableWithFeedback>
    );
  }
}

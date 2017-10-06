import * as React from 'react';
import { Text, View } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
import styles from './styles/questionCheckboxItem';
export default class CheckBoxItem extends React.Component {
    constructor() {
        super(...arguments);
        this.handlePress = () => {
            const checked = !this.props.checked;
            if (this.props.onChange) {
                this.props.onChange(checked, this.props.value);
            }
        };
    }
    render() {
        const { text = null, value, checked, pristine = false, } = this.props;
        const checkboxStyles = [
            styles.checkbox,
            checked ? styles.checkboxChecked : null,
        ];
        const checkboxTextStyles = [
            styles.checkboxText,
            pristine ? styles.checkboxTextPristine : null,
        ];
        return (<TouchableWithFeedback onPress={this.handlePress}>
        <View style={styles.container}>
          <View style={checkboxStyles}>
            <Text style={checkboxTextStyles}>
              {pristine ? '-' : checked ? '✓' : ' '}
            </Text>
          </View>
          <Text style={styles.label}>{text || value}</Text>
        </View>
      </TouchableWithFeedback>);
    }
}

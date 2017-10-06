import * as React from 'react';
import { Text, View } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
import styles from './styles/questionRadioItem';
export default class QuestionRadioItem extends React.Component {
    constructor() {
        super(...arguments);
        this.handlePress = () => {
            const checked = !this.props.checked;
            if (checked && this.props.onChange) {
                this.props.onChange(this.props.value);
            }
        };
    }
    render() {
        const { text = null, value, checked, } = this.props;
        const radioStyle = [
            styles.radio,
            checked ? styles.radioChecked : null,
        ];
        return (<TouchableWithFeedback onPress={this.handlePress}>
        <View style={styles.container}>
          <View style={radioStyle}>
            <Text style={styles.radioText}>{checked ? '✓' : ' '}</Text>
          </View>
          <Text style={styles.label}>{text || value}</Text>
        </View>
      </TouchableWithFeedback>);
    }
}

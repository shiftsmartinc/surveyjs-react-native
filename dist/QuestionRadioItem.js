import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from './colors';
import TouchableWithFeedback from './TouchableWithFeedback';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 1,
        marginBottom: 1,
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomColor: colors.extraLightGray,
        borderBottomWidth: 1,
    },
    radio: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gray,
        overflow: 'hidden',
    },
    radioChecked: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    radioText: {
        color: colors.white,
    },
    label: {
        flex: 1,
        lineHeight: 20,
        fontWeight: '500',
        color: colors.darkGray,
    }
});
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

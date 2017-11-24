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
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 5,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: colors.gray,
    },
    checkboxChecked: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    checkboxText: {
        color: colors.white,
        textAlign: 'center',
    },
    checkboxTextPristine: {
        color: colors.black,
    },
    label: {
        flex: 1,
        lineHeight: 20,
        fontWeight: '500',
        color: 'slategrey',
    }
});
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

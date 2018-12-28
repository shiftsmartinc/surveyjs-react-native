import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        marginHorizontal: 24,
        paddingHorizontal: 10,
        height: 54,
        backgroundColor: '#fff',
        shadowColor: '#e3e3e9',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 4,
    },
    containerChecked: {
        backgroundColor: '#1a71cf',
        shadowOpacity: 0.5,
        shadowColor: '#8eb8ff',
    },
    label: {
        fontSize: 16,
        color: '#113260',
    },
    labelChecked: {
        color: '#fff',
    },
    checkbox: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#1a71cf',
        overflow: 'hidden',
        width: 20,
        height: 20,
    },
    checkboxChecked: {
        borderColor: '#fff',
    },
    pristine: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        overflow: 'hidden',
        width: 20,
        height: 20,
    },
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
        const { text = null, value, checked, pristine = false } = this.props;
        return (<TouchableWithFeedback onPress={this.handlePress}>
        <View style={[styles.container, checked && styles.containerChecked]}>
          <Text style={[styles.label, checked && styles.labelChecked]}>{text || value}</Text>
          {pristine
            ? (<View style={styles.pristine}>
              </View>)
            : (<View style={[styles.checkbox, checked && styles.checkboxChecked]}>
              </View>)}
        </View>
      </TouchableWithFeedback>);
    }
}

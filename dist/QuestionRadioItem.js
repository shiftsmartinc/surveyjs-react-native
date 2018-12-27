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
    radio: {
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
    radioChecked: {
        borderColor: '#fff',
    },
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
        const { text = null, value, checked } = this.props;
        return (<TouchableWithFeedback style={[styles.container, checked && styles.containerChecked]} onPress={this.handlePress}>
        <Text style={[styles.label, checked && styles.labelChecked]}>{text || value}</Text>
        <View style={[styles.radio, checked && styles.radioChecked]}>
        </View>
      </TouchableWithFeedback>);
    }
}

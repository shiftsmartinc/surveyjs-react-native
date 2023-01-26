import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { inject, observer } from 'mobx-react';
import TouchableWithFeedback from './TouchableWithFeedback';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        marginHorizontal: 24,
        paddingHorizontal: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1a71cf',
        marginRight: 8,
        width: 29,
        height: 29,
        backgroundColor: '#fff',
    },
    labelChecked: {
        borderColor: '#fff',
    },
    labelText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#1a71cf',
    },
    text: {
        flex: 1,
        paddingVertical: 14,
        paddingHorizontal: 10,
        lineHeight: 20,
        fontSize: 16,
        color: '#113260',
    },
    textChecked: {
        color: '#fff',
    },
    checkbox: {
        width: 23,
        height: 23,
    },
});
class CheckBoxItem extends React.Component {
    handlePress = () => {
        const checked = !this.props.checked;
        if (this.props.onChange) {
            this.props.onChange(checked, this.props.value);
        }
    };
    render() {
        const { isPreview, label, text, value, checked, pristine } = this.props;
        return (<TouchableWithFeedback style={[styles.container, checked && styles.containerChecked]} onPress={this.handlePress}>
        {label && (<View style={[styles.label, checked && styles.labelChecked]}>
            <Text style={styles.labelText}>{label}</Text>
          </View>)}
        <Text style={[styles.text, checked && styles.textChecked]}>
          {text || value}
        </Text>
        {!isPreview && (<Image style={styles.checkbox} source={pristine
                    ? require('./images/radio-checked.png')
                    : checked
                        ? require('./images/checkbox-checked.png')
                        : require('./images/check.png')}/>)}
      </TouchableWithFeedback>);
    }
}
export default inject((store) => ({
    isPreview: store.model.isPreview,
}))(observer(CheckBoxItem));

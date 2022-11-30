import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
import DateTimePicker from './DatetimePicker';
import moment from 'moment';
const styles = StyleSheet.create({
    caption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 24,
        paddingHorizontal: 16,
        height: 64,
        backgroundColor: '#fff',
        shadowColor: '#e3e3e9',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
    },
    captionText: {
        paddingLeft: 12,
        fontSize: 15,
        color: '#4471a0',
    },
});
export default class QuestionTextDatetime extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isDateTimePickerVisible: false,
            value: null,
        };
        this.openPicker = () => {
            this.setState({ isDateTimePickerVisible: true });
        };
        this.closePicker = () => {
            this.setState({ isDateTimePickerVisible: false });
        };
        this.onConfirm = (date) => {
            this.setState({ value: date });
            this.props.onChange(date);
            this.closePicker();
        };
    }
    getPlaceholder() {
        const { inputType } = this.props;
        if (inputType === 'date') {
            return 'Select Date';
        }
        if (inputType === 'time') {
            return 'Select Time';
        }
        return 'Select Date & Time';
    }
    getFormatedValue(value) {
        const { inputType } = this.props;
        if (inputType === 'date') {
            return moment(value).format('LL');
        }
        if (inputType === 'time') {
            return moment(value).format('LT');
        }
        return moment(value).format('LLLL');
    }
    render() {
        const { placeholder = this.getPlaceholder(), value, inputType } = this.props;
        const { isDateTimePickerVisible } = this.state;
        return (<View>
        <TouchableWithFeedback style={styles.caption} onPress={this.openPicker}>
          {(inputType === 'datetime' || inputType === 'datetimte-local') &&
            <Image style={{ width: 36, height: 38 }} source={require('./images/date-time.png')}/>}
          {inputType === 'date' && <Image style={{ width: 32, height: 33 }} source={require('./images/date.png')}/>}
          {inputType === 'time' && <Image style={{ width: 30, height: 30 }} source={require('./images/time.png')}/>}
          <Text style={styles.captionText}>{value ? this.getFormatedValue(value) : placeholder}</Text>
        </TouchableWithFeedback>
        <DateTimePicker isVisible={isDateTimePickerVisible} mode={inputType === 'datetimte-local' ? 'datetime' : inputType} onConfirm={this.onConfirm} onCancel={this.closePicker} is24Hour={false}/>
      </View>);
    }
}

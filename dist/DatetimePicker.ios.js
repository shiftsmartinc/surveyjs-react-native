import React from 'react';
import { Dimensions, StyleSheet, Modal, Image, View, Text, DatePickerIOS } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    caption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 24,
        paddingHorizontal: 16,
        height: 50,
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
        fontSize: 16,
        color: '#113260',
    },
    rightArrow: {
        width: 16,
        height: 17,
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0, 99, 206, 0.42)',
    },
    modalContainer: {
        position: 'absolute',
        top: height - 360,
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingHorizontal: 18,
        height: 64,
    },
    modalHeaderText: {
        flex: 1,
        textAlign: 'center',
        paddingRight: 12,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4471a0',
    },
    leftArrow: {
        width: 12,
        height: 21,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 30,
        marginHorizontal: 24,
        height: 50,
        backgroundColor: '#1a71cf',
        shadowColor: '#8eb8ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
});
export default class DatetimePicker extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            date: new Date(),
        };
    }
    getTitle() {
        const { mode } = this.props;
        if (mode === 'date') {
            return 'Select Date';
        }
        if (mode === 'time') {
            return 'Select Time';
        }
        return 'Select Date & Time';
    }
    render() {
        const { isVisible, mode, onConfirm, onCancel } = this.props;
        const { date } = this.state;
        return (<Modal visible={isVisible} onRequestClose={() => onCancel(date)}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableWithFeedback onPress={() => onCancel(date)}>
                <Image style={styles.leftArrow} source={require('./images/left-arrow-blue.png')}/>
              </TouchableWithFeedback>
              <Text style={styles.modalHeaderText}>{this.getTitle()}</Text>
            </View>
            <DatePickerIOS mode={mode} date={date} onDateChange={date => this.setState({ date })}/>
            <TouchableWithFeedback style={styles.button} onPress={() => onConfirm(date)}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableWithFeedback>
          </View>
        </View>
      </Modal>);
    }
}

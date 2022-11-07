import React from 'react';
import { StyleSheet, Modal, Image, View, ScrollView, Text } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
import QuestionText from './QuestionText';
import QuestionRadiogroup from './QuestionRadiogroup';
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
        top: '50%',
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
        borderBottomColor: 'rgba(31, 133, 242, 0.42)',
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
    modalContent: {
        flexGrow: 1,
        paddingTop: 20,
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
const OTHER_VALUE = 'other';
const DEFAULT_OTHER_TEXT = 'other (describe)';
const DEFAULT_OPTION_CAPTION = 'Select an Answer';
export default class QuestionDropdown extends React.Component {
    constructor(props) {
        super(props);
        const options = [
            ...props.choices,
        ];
        if (props.hasOther) {
            options.push({
                value: OTHER_VALUE,
                text: props.otherText || DEFAULT_OTHER_TEXT,
            });
        }
        this.state = {
            options,
            modalVisible: false,
        };
    }
    handleCommentChange = (comment) => {
        this.props.onChange(this.props.value, comment);
    };
    openModal = () => {
        this.setState({ modalVisible: true });
    };
    closeModal = () => {
        this.setState({ modalVisible: false });
    };
    render() {
        const { otherText = DEFAULT_OTHER_TEXT, optionsCaption = DEFAULT_OPTION_CAPTION, value, comment, hasOther, onChange } = this.props;
        const { options, modalVisible } = this.state;
        const selectedChocie = options.find(v => v.value === value) || {};
        return (<View>
        <TouchableWithFeedback style={styles.caption} onPress={this.openModal}>
          <Text style={styles.captionText}>{selectedChocie.text || optionsCaption}</Text>
          <Image style={styles.rightArrow} source={require('./images/right-arrow-grey.png')}/>
        </TouchableWithFeedback>
        {value === OTHER_VALUE &&
                <QuestionText value={comment} onChange={this.handleCommentChange} placeholder={otherText}/>}
        <Modal visible={modalVisible} onRequestClose={this.closeModal}>
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableWithFeedback onPress={this.closeModal}>
                  <Image style={styles.leftArrow} source={require('./images/left-arrow-blue.png')}/>
                </TouchableWithFeedback>
                <Text style={styles.modalHeaderText}>Select an Answer</Text>
              </View>
              <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
                <QuestionRadiogroup choices={options} onChange={onChange} value={selectedChocie.value} hasOther={hasOther} comment={comment} otherText={otherText}/>
              </ScrollView>
              <TouchableWithFeedback style={styles.button} onPress={this.closeModal}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableWithFeedback>
            </View>
          </View>
        </Modal>
      </View>);
    }
}

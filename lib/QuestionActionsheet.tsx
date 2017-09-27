import * as React from 'react';
import { View, Text, TextInput, Modal } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';

import styles from './styles/questionActionsheet';

interface Props {
  choices: any;
  hasOther?: boolean;
  optionsCaption?: string;
  value: string;
  comment?: string;
  otherText?: string;
  onChange(value, comment?);
}

const OTHER_VALUE = 'other';
const DEFAULT_OTHER_TEXT = 'other (describe)';

const DEFAULT_OPTION_CAPTION = 'select';


export default class QuestionActionsheet extends React.Component<Props, any>{

  constructor(props) {
    super(props);

    this.state = {
      otherChecked: false,
      modalVisible: false,
    };
  }

  handleChoicesChange = (value) => {
    this.props.onChange(value);
    this.toggleModalVisible();
  }

  handleCommentChange = (comment) => {
    this.props.onChange(this.props.value, comment);
  }

  toggleModalVisible = () => {
    const modalVisible = !this.state.modalVisible;
    this.setState({
      modalVisible
    });
  }

  renderItem = (choice) => {
    return (
      <TouchableWithFeedback
        key={choice.value}
        onPress={() => this.handleChoicesChange(choice.value)}
      >
        <View style={styles.optionItem} >
          <Text style={styles.text}>{choice.text}</Text>
        </View>
      </TouchableWithFeedback>
    );
  }

  renderModalContent = () => {
    const {
      otherText = DEFAULT_OTHER_TEXT,
      choices = [],
      hasOther = false,
    } = this.props;
    return (
      <View style={styles.modal}>
        <View style={styles.optionContainer}>
          {choices.map(v => this.renderItem(v))}
          {
            hasOther && this.renderItem({ value: OTHER_VALUE, text: otherText })
          }
        </View>

        <View
          style={[styles.optionContainer, styles.cancelOption]}
        >
          <TouchableWithFeedback
            onPress={this.toggleModalVisible}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableWithFeedback>
        </View>
      </View>
    );
  }

  render() {
    const { optionsCaption = DEFAULT_OPTION_CAPTION } = this.props;
    const {
      otherText = DEFAULT_OTHER_TEXT,
      value,
      comment,
    } = this.props;
    const selectedChocie = [
      ...this.props.choices,
      {
        value: OTHER_VALUE,
        text: otherText,
      }
    ].find(v => v.value === value);
    const caption = selectedChocie ? selectedChocie.text : optionsCaption;
    return (
      <View>
        <TouchableWithFeedback
          onPress={this.toggleModalVisible}
        >
          <View style={styles.caption}>
            <Text style={styles.captionText}>{caption}</Text>
          </View>
        </TouchableWithFeedback>
        {
          value === OTHER_VALUE &&
          <TextInput
            value={comment}
            onChangeText={this.handleCommentChange}
            style={styles.otherTextInput}
          />
        }
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.toggleModalVisible}
        >
          {this.renderModalContent()}
        </Modal>
      </View>
    )
  }
}

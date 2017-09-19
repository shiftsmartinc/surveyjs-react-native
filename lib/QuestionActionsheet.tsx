import * as React from 'react';
import { View, Text, TextInput, Modal } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
import QuestionWrapper, { Props as QuestionWrapperProps } from './QuestionWrapper';

import styles from './styles/questionActionsheet';

interface Props extends QuestionWrapperProps {
  choices: any;
  hasOther?: boolean;
  optionsCaption?: string;
}

const OTHER_VALUE = 'other';
const OTHER_TEXT = 'other (describe)';

const DEFAULT_OPTION_CAPTION = 'select';


export default class QuestionActionsheet extends React.Component<Props, any>{

  constructor(props) {
    super(props);

    this.state = {
      otherChecked: false,
      modalVisible: false,
      selectedChoiceValue: '',
    };
  }

  handleChoicesChange = (value) => {
    this.setState({
      selectedChoiceValue: value,
    })
    this.toggleModalVisible();
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
    return (
      <View style={styles.modal}>
        <View style={styles.optionContainer}>
          {this.props.choices.map(v => this.renderItem(v))}
          {
            this.props.hasOther && this.renderItem({ value: OTHER_VALUE, text: OTHER_TEXT })
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
    const selectedChocie = [
      ...this.props.choices,
      {
        value: OTHER_VALUE,
        text: OTHER_TEXT,
      }
    ].find(v => v.value === this.state.selectedChoiceValue);
    const caption = selectedChocie ? selectedChocie.text : optionsCaption;
    return (
      <QuestionWrapper
        {...this.props}
      >
        <View>
          <TouchableWithFeedback
            onPress={this.toggleModalVisible}
          >
            <View style={styles.caption}>
              <Text>{caption}</Text>
            </View>
          </TouchableWithFeedback>
          {
            this.state.selectedChoiceValue === OTHER_VALUE &&
            <TextInput style={styles.otherTextInput} />
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

      </QuestionWrapper>
    )
  }
}

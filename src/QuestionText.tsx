import React from 'react';
import { StyleSheet, TextInput, Text, View, Modal, Image, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import TouchableWithFeedback from './TouchableWithFeedback';

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 24,
    paddingVertical: 0,
    paddingHorizontal: 16,
    fontSize: 15,
    height: 50,
    color: '#4471a0',
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
  modal: {
      flex: 1,
      backgroundColor: 'rgba(0, 99, 206, 0.42)',
  },
  modalContainer: {
      position: 'absolute',
      top: '10%',
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
      paddingTop: 20,
      flexDirection: 'column',
      justifyContent: 'flex-start',
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
  autoCompleteItem: {
      backgroundColor: '#fff',
      borderColor: '#e3e3e9',
      borderRadius: 5,
      borderWidth: StyleSheet.hairlineWidth,
      height: 50,
      justifyContent: 'center',
      marginHorizontal: 24,
      paddingLeft: 15,
      marginBottom: 7,
  },
  autoCompleteItemText: {
      fontSize: 15,
      color: '#4471a0',
  }
});

export interface Props {
  isPreview?: boolean;
  placeholder?: string;
  inputType?: string;
  rows?: number;
  value: string;
  onChange(value: string): Function;
  autoComplete?: string;
  dataList?: [string];
}

@inject((store: any) => ({
  isPreview: store.model.isPreview,
}))
@observer
export default class QuestionText extends React.Component<Props> {
  getKeyboardType = () => {
    const { inputType = 'text' } = this.props;
    switch(inputType) {
      case 'number':
        return 'numeric';

      case 'email':
        return 'email-address';

      default:
        return 'default';
    }
  }
  state = {
    autocompleteModalVisible: false,
  }
  openAutocompleteModal = () => {
      const { autoComplete = null, dataList = [] } = this.props;
      if (!!autoComplete && !!dataList) {
        this.setState({ autocompleteModalVisible: true });
      }
  };
  closeAutocompleteModal = () => {
      this.setState({ autocompleteModalVisible: false });
  };

  renderAutoCompleteItem = ({ item }) => (
    <TouchableWithFeedback style={styles.autoCompleteItem} onPress={() => {
      const { onChange } = this.props; 
      onChange(item.text);
      this.closeAutocompleteModal();
    }}>
      <Text style={styles.autoCompleteItemText}>{item.text}</Text>
    </TouchableWithFeedback>
  );
  render() {
    const { autocompleteModalVisible } = this.state;
    const { isPreview, placeholder, value, onChange, rows = 1, autoComplete = null, dataList = [] } = this.props;
    const isMultiline = rows > 1;
    let autoCompleteContent;
    if (!!autoComplete && !!dataList) {
      const autoCompleteData = dataList.map(text => ({ text, id: text }));
      const filteredAutocompleteOptions = autoCompleteData.filter(item => {
        const regex = new RegExp(value, 'i');
        return regex.test(item.text);
      });
      autoCompleteContent = (
        <Modal
          visible={autocompleteModalVisible}
          onRequestClose={this.closeAutocompleteModal}
          animationType="slide"
        >
          <View style={styles.modal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableWithFeedback onPress={this.closeAutocompleteModal}>
                  <Image style={styles.leftArrow} source={require('./images/left-arrow-blue.png')}/>
                </TouchableWithFeedback>
                <Text style={styles.modalHeaderText}>Select an Answer</Text>
              </View>
              <View style={styles.modalContent}>
              </View>
              <TextInput style={[styles.input, { marginBottom: 10 }]} placeholder="Start typing to see choices" value={value} onChangeText={onChange} placeholderTextColor="#4471a0" underlineColorAndroid={'transparent'} />
                <FlatList
                  data={!!value ? filteredAutocompleteOptions : []}
                  renderItem={this.renderAutoCompleteItem}
                  keyExtractor={item => item.id}
                />
              <TouchableWithFeedback style={styles.button} onPress={this.closeAutocompleteModal}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableWithFeedback>
            </View>
          </View>
        </Modal>
      );
    }
    return (
      <>
        <TextInput
          style={[styles.input, isMultiline && { height: 19 * rows }]}
          multiline={isMultiline}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          numberOfLines={Number(rows)}
          placeholderTextColor="#4471a0"
          underlineColorAndroid={'transparent'}
          keyboardType={this.getKeyboardType()}
          editable={!isPreview}
          onFocus={this.openAutocompleteModal}
        />
        {autoCompleteContent}
      </>
    );
  }
}

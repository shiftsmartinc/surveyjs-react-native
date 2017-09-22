import * as React from 'react';
import { View, Text } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';


interface Props {
  placeholder?: string;
  inputType: string;
}


export default class QuestionTextDatetime extends React.Component<Props, any> {
  private mode;

  constructor(props) {
    super(props);

    this.state = {
      isPickerVisible: false,
      value: null,
    };

    this.mode = (this.props.inputType === 'datetimte-local') ? 'datetime' : this.props.inputType;
  }

  showPicker = () => {
    this.setState({
      isPickerVisible: true,
    });
  }

  hidePicker = () => {
    this.setState({
      isPickerVisible: false,
    });
  }

  handleConfirm = (date) => {
    this.setState({
      value: date,
    });
    this.hidePicker();
  }

  getFormatedValue = (value) => {
    const { inputType } = this.props;
    if (inputType === 'date') {
      return moment(value).format('LL');
    } else if (inputType === 'time') {
      return moment(value).format('LT');
    }
    return moment(value).format('LLL');
  }

  render() {
    const {
      placeholder = 'show picker',
    } = this.props;
    return (
      <View>
        <TouchableWithFeedback
          onPress={this.showPicker}
        >
          <Text>
            {
              this.state.value ?
              this.getFormatedValue(this.state.value) : placeholder
            }
          </Text>
        </TouchableWithFeedback>
        <DateTimePicker
          isVisible={this.state.isPickerVisible}
          mode={this.mode}
          onConfirm={this.handleConfirm}
          onCancel={this.hidePicker}
        />
      </View>
    );
  }
}

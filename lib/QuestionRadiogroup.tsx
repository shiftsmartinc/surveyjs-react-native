import * as React from 'react';
import { View, TextInput } from 'react-native';
import RadioItem from './QuestionRadioItem';

interface Props {
  choices: any;
  hasOther?: boolean;
  onChange(value, comment?);
  value: string;
  comment?: string;
  otherText?: string;
}

const OTHER_VALUE = 'other';
const DEFAULT_OTHER_TEXT = 'other (describe)';


export default class QuestionRadiogroup extends React.Component<Props, any> {
  handleChoicesChange = (value) => {
    this.props.onChange(value);
  }

  handleTextInputChange = (comment) => {
    this.props.onChange(this.props.value, comment);
  }

  render() {
    const {
      otherText = DEFAULT_OTHER_TEXT,
      choices = [],
    } = this.props;
    return (
      <View>
        {choices.map(v =>
          <RadioItem
            key={v.value}
            value={v.value}
            text={v.text}
            checked={this.props.value === v.value}
            onChange={this.handleChoicesChange}
          />
        )}
        {
          this.props.hasOther &&
          <View>
            <RadioItem
              value={OTHER_VALUE}
              text={otherText}
              checked={this.props.value === OTHER_VALUE}
              onChange={this.handleChoicesChange}
            />
            {this.props.value === OTHER_VALUE &&
              <TextInput
                onChangeText={this.handleTextInputChange}
                value={this.props.comment}
                style={{ borderWidth: 1 }}
              />}
          </View>
        }
      </View>
    )
  }
}

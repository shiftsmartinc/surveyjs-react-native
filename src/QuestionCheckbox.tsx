import * as React from 'react';
import { View } from 'react-native';
import CheckboxItem from './QuestionCheckboxItem';
import QuestionText from './QuestionText';

export interface Props {
  choices: any;
  hasOther?: boolean;
  value: Array<string>;
  comment?: string;
  otherText?: string;
  onChange(value, comment?);
}

const OTHER_VALUE = 'other';
const DEFAULT_OTHER_TEXT = 'other (describe)';

export default class QuestionCheckbox extends React.Component<Props, any>{

  handleChoicesChange = (checked, value) => {

    const valueSet = new Set(this.props.value);
    if (checked) {
      valueSet.add(value);
    } else {
      valueSet.delete(value);
    }
    this.props.onChange([...valueSet]);
  }

  handleCommentChange = (comment) => {
    this.props.onChange(this.props.value, comment);
  }

  render() {
    const {
      comment = '',
      otherText = DEFAULT_OTHER_TEXT,
    } = this.props;
    const value = this.props.value || [];
    const otherChecked = value.indexOf(OTHER_VALUE) !== -1;
    return (
      <View>
        {this.props.choices.map(v =>
          <CheckboxItem
            key={v.value}
            value={v.value}
            text={v.text}
            // checked={this.state.selectedChoices[v.value]}
            checked={value.indexOf(v.value) !== -1}
            onChange={this.handleChoicesChange}
          />
        )}
        {
          this.props.hasOther &&
          <View>
            <CheckboxItem
              value={OTHER_VALUE}
              text={otherText}
              checked={otherChecked}
              onChange={this.handleChoicesChange}
            />
            {otherChecked &&
              <QuestionText
                value={comment}
                onChange={this.handleCommentChange}
                placeholder={otherText}
              />
            }
          </View>
        }
      </View>
    )
  }
}

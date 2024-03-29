import React from 'react';
import { View } from 'react-native';
import CheckboxItem from './QuestionCheckboxItem';
import QuestionText from './QuestionText';

export interface QuestionCheckboxProps {
  choices: Array<any>;
  comment?: string;
  hasOther?: boolean;
  onChange(value, comment?);
  otherText?: string;
  value: Array<string>;
}

const ALPHABET = [...Array(26)].map((_e, i) =>
  (i + 10).toString(36).toUpperCase(),
);
const DEFAULT_OTHER_TEXT = 'other (describe)';
const OTHER_VALUE = 'other';

export default class QuestionCheckbox extends React.Component<QuestionCheckboxProps> {
  handleChoicesChange = (checked, value) => {
    const valueSet = new Set(this.props.value);
    if (checked) {
      valueSet.add(value);
    } else {
      valueSet.delete(value);
    }
    this.props.onChange([...valueSet]);
  };

  handleCommentChange = (comment) => {
    this.props.onChange(this.props.value, comment);
  };

  render() {
    const {
      choices,
      comment = '',
      otherText = DEFAULT_OTHER_TEXT,
    } = this.props;
    const value = this.props.value || [];
    const otherChecked = value.indexOf(OTHER_VALUE) !== -1;
    const generatedChoices =
      choices.length > 26
        ? choices
        : choices.map((c, i) => ({ ...c, label: ALPHABET[i] }));
    return (
      <View>
        {generatedChoices.map((v) => (
          <CheckboxItem
            key={v.value}
            label={v.label}
            value={v.value}
            text={v.text}
            // checked={this.state.selectedChoices[v.value]}
            checked={value.indexOf(v.value) !== -1}
            onChange={this.handleChoicesChange}
          />
        ))}
        {this.props.hasOther && (
          <View>
            <CheckboxItem
              value={OTHER_VALUE}
              text="Other"
              checked={otherChecked}
              onChange={this.handleChoicesChange}
            />
            {otherChecked && (
              <QuestionText
                value={comment}
                onChange={this.handleCommentChange}
                placeholder={otherText}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

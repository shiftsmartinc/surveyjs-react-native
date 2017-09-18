import * as React from 'react';
import { View, TextInput } from 'react-native';
import QuestionWrapper, { Props as QuestionWrapperProps } from './QuestionWrapper';
import RadioItem from './QuestionRadioItem';

interface Props extends QuestionWrapperProps {
  choices: any;
  hasOther?: boolean;
}

const OTHER_VALUE = 'other';
const OTHER_TEXT = 'other (describe)';

export default class QuestionCheckbox extends React.Component<Props, any>{

  constructor(props) {
    super(props);

    this.state = {
      otherChecked: false,
      selectedChoice: '',
    };
  }

  handleChoicesChange = (value) => {
    this.setState({
      selectedChoice: value,
    })
  }

  render() {
    const expanedChoices = this.props.choices.map(v => typeof v === 'string' ? { value: v, text: v } : v);
    return (
      <QuestionWrapper
        {...this.props}
      >
        <View>
          {expanedChoices.map(v =>
            <RadioItem
              key={v.value}
              value={v.value}
              text={v.text}
              checked={this.state.selectedChoice === v.value}
              onChange={this.handleChoicesChange}
            />
          )}
          {
            this.props.hasOther &&
            <View>
              <RadioItem
                value={OTHER_VALUE}
                text={OTHER_TEXT}
                checked={this.state.selectedChoice === OTHER_VALUE}
                onChange={this.handleChoicesChange}
              />
              {this.state.selectedChoice === OTHER_VALUE && <TextInput style={{ borderWidth: 1 }} />}
            </View>
          }
        </View>
      </QuestionWrapper>
    )
  }
}

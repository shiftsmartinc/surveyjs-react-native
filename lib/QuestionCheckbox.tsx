import * as React from 'react';
import { View, TextInput } from 'react-native';
import QuestionWrapper, { Props as QuestionWrapperProps } from './QuestionWrapper';
import CheckboxItem from './QuestionCheckboxItem';

interface Props extends QuestionWrapperProps {
  choices: any;
  hasOther?: boolean;
}

export default class QuestionCheckbox extends React.Component<Props, any>{

  constructor(props) {
    super(props);

    this.state = {
      otherChecked: false,
      selectedChoices: {}
    };
  }

  handleChoicesChange = (checked, value) => {
    const newSelected = {
      ...this.state.selectedChoices,
      [value]: checked,
    };
    this.setState({
      selectedChoices: newSelected,
    })
  }

  handleItemOtherChange = (otherChecked) => {
    this.setState({ otherChecked });
  }

  render() {
    const expanedChoices = this.props.choices.map(v => typeof v === 'string' ? {value: v, text: v} : v);
    return (
      <QuestionWrapper
        {...this.props}
      >
        <View>
          {expanedChoices.map(v =>
            <CheckboxItem
              key={v.value}
              value={v.value}
              text={v.text}
              checked={this.state.selectedChoices[v.value]}
              onChange={this.handleChoicesChange}
            />
          )}
          {
            this.props.hasOther &&
            <View>
              <CheckboxItem
                value={'other'}
                text={'other (describe)'}
                checked={this.state.otherChecked}
                onChange={this.handleItemOtherChange}
              />
              { this.state.otherChecked && <TextInput style={{ borderWidth: 1 }}/> }
            </View>
          }
        </View>
      </QuestionWrapper>
    )
  }
}

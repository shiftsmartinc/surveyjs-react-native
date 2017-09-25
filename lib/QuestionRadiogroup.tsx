import * as React from 'react';
import { View, TextInput } from 'react-native';
import RadioItem from './QuestionRadioItem';

interface Props {
  choices: any;
  hasOther?: boolean;
  onChange: any;
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
    this.props.onChange(value);
  }

  render() {
    const expanedChoices = this.props.choices.map(v => typeof v === 'string' ? { value: v, text: v } : v);
    return (
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
    )
  }
}

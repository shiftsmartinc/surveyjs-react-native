import * as React from 'react';
import { View, TextInput } from 'react-native';
import CheckboxItem from './QuestionCheckboxItem';


interface Props {
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
    return (
      <View>
        {this.props.choices.map(v =>
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
    )
  }
}

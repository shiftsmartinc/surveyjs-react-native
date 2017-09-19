import * as React from 'react';
import { View } from 'react-native';
import QuestionWrapper, { Props as QuestionWrapperProps } from './QuestionWrapper';
import CheckboxItem from './QuestionCheckboxItem';

interface Props extends QuestionWrapperProps {
  label?: string;
}

export default class QuestionBoolean extends React.Component<Props, any>{

  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      dirty: false,
    };
  }

  handleChecked = (checked) => {
    this.setState({
      dirty: true,
      checked,
    })
  }

  render() {
    const label = this.props.label || this.props.name;
    return (
      <QuestionWrapper
        {...this.props}
      >
        <View>
          <CheckboxItem
            value={''}
            text={label}
            checked={this.state.checked}
            pristine={!this.state.dirty}
            onChange={this.handleChecked}
          />
        </View>
      </QuestionWrapper>
    )
  }
}

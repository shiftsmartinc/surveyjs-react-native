import React from 'react';
import CheckboxItem from './QuestionCheckboxItem';

export interface Props {
  label?: string;
  name: string;
  value?: boolean;
  onChange(value, comment?);
}

export default class QuestionBoolean extends React.Component<Props>{
  constructor(props) {
    super(props);

    this.state = {
      dirty: false,
    };
  }

  handleChecked = (checked) => {
    this.setState({
      dirty: true,
    });

    this.props.onChange(checked);
  }

  render() {
    const label = this.props.label || this.props.name;
    return (
      <CheckboxItem
        value={''}
        text={label}
        checked={this.props.value}
        pristine={!this.state.dirty}
        onChange={this.handleChecked}
      />
    )
  }
}

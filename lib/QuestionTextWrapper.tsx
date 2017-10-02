import React from 'react';

import QuestionText from './QuestionText';
import QuestionTextDatetime from './QuestionTextDatetime';


export default class QuestionTextWrapper extends React.Component<any, any> {

  renderDate() {
    return (
      <QuestionTextDatetime
        {...this.props}
      />
    );
  }

  renderText() {
    return (
      <QuestionText
        {...this.props}
      />
    );
  }

  render() {
    const { inputType } = this.props;
    if (inputType === 'date' ||
      inputType === 'datetime' ||
      inputType === 'datetime-local' ||
      inputType === 'time') {
      return this.renderDate();

    }
    return this.renderText();
  }
}

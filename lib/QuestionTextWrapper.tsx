import React from 'react';

import QuestionText from './QuestionText';
import QuestionTextDatetime from './QuestionTextDatetime';
import QuestionTextSlider from './QuestionTextSlider';

export default class QuestionTextWrapper extends React.Component<any, any> {

  renderDate() {
    return (
      <QuestionTextDatetime
        {...this.props}
      />
    );
  }

  renderSlider() {
    return (
      <QuestionTextSlider {...this.props} />
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

    } else if (inputType === 'range') {
      return this.renderSlider();
    }
    return this.renderText();
  }
}

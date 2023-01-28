import React from 'react';
import QuestionText from './QuestionText';
import QuestionTextDatetime from './QuestionTextDatetime';
import QuestionTextSlider from './QuestionTextSlider';

export default class QuestionTextWrapper extends React.Component<any> {
  render() {
    const { inputType } = this.props;
    switch (inputType) {
      case 'date':
      case 'datetime':
      case 'datetime-local':
      case 'time':
        return <QuestionTextDatetime {...(this.props as any)} />;

      case 'range':
        return <QuestionTextSlider {...this.props} />;

      default:
        return <QuestionText {...(this.props as any)} />;
    }
  }
}

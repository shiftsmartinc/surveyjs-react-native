import * as React from 'react';
import { TextInput } from 'react-native';
import QuestionWrapper, { Props as QuestionWrapperProps } from './QuestionWrapper';

interface Props extends QuestionWrapperProps {
  placeholder?: string;
}

export default class QuestionText extends React.Component<Props, any>{
  render() {
    return (
      <QuestionWrapper
        {...this.props}
      >
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        />
      </QuestionWrapper>
    )
  }
}

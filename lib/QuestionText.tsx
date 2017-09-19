import * as React from 'react';
import { TextInput } from 'react-native';
import QuestionWrapper, { Props as QuestionWrapperProps } from './QuestionWrapper';

import styles, { LINE_HEIGHT } from './styles/questionText';

interface Props extends QuestionWrapperProps {
  placeholder?: string;
  multiline?: boolean;
  row?: number;
}

export default class QuestionText extends React.Component<Props, any>{
  render() {
    const { row = 1 } = this.props;
    return (
      <QuestionWrapper
     {...this.props}
      >
        <TextInput
          // style={{ height: 20 * row, borderColor: 'gray', borderWidth: 1 }}
          style={[
            styles.input,
            { minHeight: LINE_HEIGHT * row },
          ]}
          multiline={this.props.multiline}
          numberOfLines={row}
          underlineColorAndroid={'transparent'}
          blurOnSubmit={!this.props.multiline}
        />
      </QuestionWrapper>
    );
  }
}

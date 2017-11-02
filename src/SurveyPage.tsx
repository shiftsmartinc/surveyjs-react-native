import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from './colors';
import QuestionWrapper from './QuestionWrapper';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 100,
  },
  error: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: colors.red,
  },
  errorText: {
    color: colors.white,
  },
  questionContent: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: colors.white,
  },
});

export interface Props {
  questions: any;
  // onValueChange: (name, value, comment?) => {};
}

export default class SurveyPage extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        {this.props.questions.map(question =>
          <QuestionWrapper key={question.json.name} question={question} />
        )}
      </View>
    );
  }
}

import React from 'react';
import { inject, observer } from 'mobx-react/native';
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

export interface Injected {
  pages?: Array<any>;
  curPageIndex?: number;
  questions?: Array<any>;
}

export interface Props {
}

@inject(({ model }) => ({
  pages: model.pages,
  curPageIndex: model.curPageIndex,
  questions: model.questions,
}))
@observer
export default class SurveyPage extends React.Component<Injected & Props> {
  render() {
    const { pages, curPageIndex, questions } = this.props;
    const page = pages.find(v => v.pageIndex === curPageIndex);
    return (
      <View style={styles.container}>
        {page.questionNames.map(name => questions[name]).map(question =>
          <QuestionWrapper key={question.json.name} question={question} />
        )}
      </View>
    );
  }
}

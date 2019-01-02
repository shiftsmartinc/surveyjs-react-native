import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import QuestionWrapper from './QuestionWrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    marginTop: 28,
    paddingBottom: 28,
  },
});

@inject((store: any) => ({
  currentPageProps: store.model.currentPageProps,
}))
@observer
export default class SurveyPage extends React.Component<any> {
  render() {
    const { currentPageProps } = this.props;
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {currentPageProps.questions.map(question =>
          <QuestionWrapper key={question.json.name} question={question} />
        )}
      </ScrollView>
    );
  }
}

import React from 'react';
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { inject, observer } from 'mobx-react';
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
  currentPage: store.model.currentPage,
  curPageIndex: store.model.curPageIndex,
  questions: store.model.questions,
}))
@observer
export default class SurveyPage extends React.Component<any> {
  scrollView: KeyboardAwareScrollView;
  componentDidUpdate(prevProps) {
    if (this.props.curPageIndex !== prevProps.curPageIndex) {
      requestAnimationFrame(() => {
        this.scrollView.scrollToPosition(0, 0, true);
      });
    }
  }

  render() {
    const { questions, currentPage } = this.props;
    return (
      <KeyboardAwareScrollView
        ref={(ref) => { this.scrollView = ref; }}
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        enableOnAndroid
      >
        {currentPage.questionNames.map(questionName => {
          const question = questions[questionName];
          return (
            <QuestionWrapper key={question.json.name} question={question} visible={question.visible} />
          );
        })}
      </KeyboardAwareScrollView>
    );
  }
}

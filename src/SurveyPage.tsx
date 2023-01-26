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
  currentQuestions: store.model.currentQuestions,
  curPageIndex: store.model.curPageIndex,
  rerenderSurveyPage: store.model.rerenderSurveyPage,
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
    const { currentQuestions } = this.props;
    return (
      <KeyboardAwareScrollView
        ref={(ref) => { this.scrollView = ref; }}
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        enableOnAndroid
      >
        {currentQuestions.questions.map(question =>
          <QuestionWrapper key={question.json.name} question={question} visible={question.visible} />
        )}
      </KeyboardAwareScrollView>
    );
  }
}

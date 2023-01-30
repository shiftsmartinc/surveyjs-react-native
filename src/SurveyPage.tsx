import React from 'react';
import { StyleSheet } from 'react-native';
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

export interface SurveyPageProps {
  curPageIndex?: any;
  currentPageProps?: any;
}

class SurveyPage extends React.Component<SurveyPageProps> {
  scrollView: KeyboardAwareScrollView;

  componentDidUpdate(prevProps) {
    if (this.props.curPageIndex !== prevProps.curPageIndex) {
      requestAnimationFrame(() => {
        this.scrollView.scrollToPosition(0, 0, true);
      });
    }
  }

  render() {
    const { currentPageProps } = this.props;

    return (
      <KeyboardAwareScrollView
        ref={(ref) => {
          this.scrollView = ref;
        }}
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        enableOnAndroid
      >
        {currentPageProps.questions.map((question) => (
          <QuestionWrapper key={question.json.name} question={question} />
        ))}
      </KeyboardAwareScrollView>
    );
  }
}

export default inject((store: any) => ({
  curPageIndex: store.model.curPageIndex,
  currentPageProps: store.model.currentPageProps,
}))(observer(SurveyPage));

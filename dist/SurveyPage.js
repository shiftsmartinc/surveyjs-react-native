var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let SurveyPage = class SurveyPage extends React.Component {
    scrollView;
    componentDidUpdate(prevProps) {
        if (this.props.curPageIndex !== prevProps.curPageIndex) {
            requestAnimationFrame(() => {
                this.scrollView.scrollToPosition(0, 0, true);
            });
        }
    }
    render() {
        const { questions, currentPage } = this.props;
        return (<KeyboardAwareScrollView ref={(ref) => { this.scrollView = ref; }} style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} enableOnAndroid>
        {currentPage.questionNames.map(questionName => {
                const question = questions[questionName];
                return (<QuestionWrapper key={question.json.name} question={question} visible={question.visible}/>);
            })}
      </KeyboardAwareScrollView>);
    }
};
SurveyPage = __decorate([
    inject((store) => ({
        currentPage: store.model.currentPage,
        curPageIndex: store.model.curPageIndex,
        questions: store.model.questions,
    })),
    observer
], SurveyPage);
export default SurveyPage;

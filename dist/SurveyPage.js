var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let SurveyPage = class SurveyPage extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.currentPageProps !== nextProps.curPageIndex) {
            this.scrollView.scrollTo({ y: 0, animated: true });
        }
    }
    render() {
        const { currentPageProps } = this.props;
        return (<ScrollView ref={(ref) => { this.scrollView = ref; }} style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {currentPageProps.questions.map(question => <QuestionWrapper key={question.json.name} question={question}/>)}
      </ScrollView>);
    }
};
SurveyPage = __decorate([
    inject((store) => ({
        currentPageProps: store.model.currentPageProps,
        curPageIndex: store.model.curPageIndex,
    })),
    observer
], SurveyPage);
export default SurveyPage;

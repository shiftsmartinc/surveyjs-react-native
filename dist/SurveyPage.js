import * as React from 'react';
import { View } from 'react-native';
import QuestionWrapper from './QuestionWrapper';
import styles from './styles/surveyPage';
export default class SurveyPage extends React.Component {
    render() {
        return (<View style={styles.container}>
        {this.props.questions.map(question => <QuestionWrapper key={question.json.name} question={question}/>)}
      </View>);
    }
}

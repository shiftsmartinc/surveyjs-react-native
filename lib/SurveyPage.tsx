import * as React from 'react';
import { View } from 'react-native';
import QuestionText from './QuestionText';
import QuestionCheckbox from './QuestionCheckbox';
// import QuestionRadio from './QuestionRadio';


import styles from './styles/surveyPage';


export default class SurveyPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <QuestionText
          name={'input text'}
          number={1}
        />

        <QuestionCheckbox
          name={'checkbox'}
          number={2}
          choices={[
            'item1',
            {
              text: 'hello world',
              value: 'item2'
            },
            'item3',
          ]}
          hasOther
        />

        <View />
      </View>
    );
  }
}

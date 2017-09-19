import * as React from 'react';
import { View } from 'react-native';
import QuestionText from './QuestionText';
import QuestionCheckbox from './QuestionCheckbox';
import QuestionRadiogroup from './QuestionRadiogroup';
import QuestionActionsheet from './QuestionActionsheet'
import QuestionRate from './QuestionRate';
import QuestionBoolean from './QuestionBoolean';

import styles from './styles/surveyPage';


export default class SurveyPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <QuestionText
          name={'input tex'}
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

        <QuestionRadiogroup
          name={'radiogroup'}
          number={3}
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

        <QuestionActionsheet
          name={'radiogroup'}
          number={4}
          choices={[
            {
              text: 'item1',
              value: 'item1'
            },
            {
              text: 'hello world',
              value: 'item2'
            },
          ]}
          hasOther
        />

        <QuestionText
          name={'comment'}
          number={5}
          multiline
          row={3}
        />

        <QuestionRate
          name={'rate'}
          number={6}
          minRateDescription={'First'}
          maxRateDescription={'Last'}
          rateValues={[{
            value: 1,
            text: 'One',
          }, {
            value: 2,
            text: 'Two',
          }, {
            value: 3,
            text: 'Three',
          }]}
        />

        <QuestionBoolean
          name={'boolean'}
          number={7}
          showTitle
          label={'boolean label'}
        />

        <View />
      </View>
    );
  }
}

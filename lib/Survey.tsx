import * as React from 'react';
import { ScrollView } from 'react-native';
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';

const demoPage = {
  "elements": [
    {
      "type": "text",
      "name": "question2"
    },
    {
      "type": "checkbox",
      "choices": [
        "item1",
        "item2",
        "item3"
      ],
      "hasOther": true,
      "name": "question1",
      "otherText": "其它的"
    },
    {
      "type": "comment",
      "name": "question8",
      "rows": 3
    },
    {
      "type": "dropdown",
      "choices": [
        "item1",
        "item2",
        "item3"
      ],
      "name": "question9"
    },
    {
      "type": "boolean",
      "name": "question7"
    },
    {
      "type": "rating",
      "name": "question6",
      "rateValues": [
        {
          "value": "1",
          "text": "one"
        },
        {
          "value": "2",
          "text": "two"
        },
        {
          "value": "3",
          "text": "three"
        }
      ]
    },
    {
      "type": "radiogroup",
      "choices": [
        "item1",
        "item2",
        "item3"
      ],
      "name": "question3"
    }
  ]
};

export default class Survey extends React.Component {
  render() {
    return (
      <ScrollView>
        <SurveyNavigation />
        <SurveyPage json={demoPage} />
      </ScrollView>
    );
  }
}

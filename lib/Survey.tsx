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
    },
    {
      "type": "multipletext",
      "commentText": "comment text",
      "items": [
        {
          "name": "text1",
          "isRequired": true,
          "inputType": "color",
          "title": "good"
        },
        {
          "name": "text2",
          "title": "bad"
        },
        {
          "name": "text3",
          "title": "kkk"
        }
      ],
      "name": "question313",
      "title": "Titles"
    },
    {
      "type": "panel",
      "elements": [
        {
          "type": "text",
          "name": "question1"
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
      ],
      "name": "panel1",
      "title": "Panel title"
    },
    {
      "type": "paneldynamic",
      "maxPanelCount": 5,
      "minPanelCount": 1,
      "name": "question131",
      "title": "Panel Dynamic",
      "panelCount": 1,
      "panelRemoveText": "REMOVE",
      "showQuestionNumbers": "onSurvey",
      "confirmDelete": true,
      "confirmDeleteText": "custom sure to remove?",
      "templateElements": [
        {
          "type": "text",
          "name": "qeustion1a"
        }
      ],
      "templateTitle": "templateTItle"
    },
    {
      "type": "html",
      "html": "<div>\n<h2>\ngood</h2>\n<p> something else </p><p>auto height fit</p>",
      "name": "questionhtml",
      "title": "html",
    },

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

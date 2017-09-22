import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from "mobx-react";

import QuestionText from './QuestionText';
import QuestionCheckbox from './QuestionCheckbox';
import QuestionRadiogroup from './QuestionRadiogroup';
import QuestionActionsheet from './QuestionActionsheet'
import QuestionRate from './QuestionRate';
import QuestionBoolean from './QuestionBoolean';
import QuestionMultipleText from './QuestionMultipleText';
import QuestionPanelDynamic from './QuestionPanelDynamic';
import QuestionHtml from './QuestionHtml';
import QuestionFile from './QuestionFile';
import QuestionTextDatetime from './QuestionTextDatetime';

import styles from './styles/surveyPage';

const commonBuilderCreator = Component => json => <Component {...json} />;

const choiceBuilderCreator = Component => (json) => {
  const choices = json.choices.map(v =>
    typeof v === 'string' ? { value: v, text: v } : v
  );

  return (
    <Component
      {...json}
      choices={choices}
    />
  );
}

const commentBuilder = json => (
  <QuestionText
    {...json}
    multiline
  />
);

const textBuilder = (json) => {
  let Component = QuestionText;
  switch (json.inputType) {
    case 'date':
    case 'datetime':
    case 'datetime-local':
    case 'time':
      Component = QuestionTextDatetime;
      break;

    default:
  }
  return (
    <Component
      {...json}
    />
  );
}


interface Props {
  questions: any;
}

@observer
export default class SurveyPage extends React.Component<Props, any> {
  panelBuilder = json => (
    <View>
      {json.elements.map(this.renderQuestion)}
    </View>
  )

  panelDynamicBuilder = json => (
    <QuestionPanelDynamic
      {...json}
      buildComponent={this.renderQuestion}
    />
  )

  private typeBuilderMap = {
    text: textBuilder,
    checkbox: choiceBuilderCreator(QuestionCheckbox),
    radiogroup: choiceBuilderCreator(QuestionRadiogroup),
    dropdown: choiceBuilderCreator(QuestionActionsheet),
    comment: commentBuilder,
    boolean: commonBuilderCreator(QuestionBoolean),
    rating: commonBuilderCreator(QuestionRate),
    multipletext: commonBuilderCreator(QuestionMultipleText),
    panel: this.panelBuilder,
    paneldynamic: this.panelDynamicBuilder,
    html: commonBuilderCreator(QuestionHtml),
    file: commonBuilderCreator(QuestionFile),
  };

  renderQuestion = (question, idx) => {
    const json = question.json;
    const newJson = { ...json, number: idx + 1 };
    const build = this.typeBuilderMap[newJson.type];
    const content = build(newJson);
    const {
      number = null,
      title = null,
      name,
      showTitle = true,
    } = newJson;
    return (
      <View key={json.name}>
        {
          showTitle &&
          <Text>{number ? `${number}.` : ''} {title || name}</Text>
        }
        {content}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.questions.map(this.renderQuestion)}
      </View>
    );
  }
}

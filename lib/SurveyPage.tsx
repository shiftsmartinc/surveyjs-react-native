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

const commonBuilderCreator = Component => question => <Component {...question.json} />;

const choiceBuilderCreator = Component => (question) => {
  const json = question.json;
  const choices = json.choices.map(v =>
    typeof v === 'string' ? { value: v, text: v } : v
  );

  return (
    <Component
      {...json}
      choices={choices}
      value={question.value}
      comment={question.comment}
      onChange={question.setValue}
    />
  );
}

const commentBuilder = question => (
  <QuestionText
    {...question.json}
    multiline
    value={question.value}
    comment={question.comment}
    onChange={question.setValue}
  />
);

const textBuilder = (question) => {
  const json = question.json;
  const inputType = json.inputType;
  if (inputType === 'date' ||
      inputType === 'datetime' ||
      inputType === 'datetime-local' ||
      inputType === 'time') {
    return (
      <QuestionTextDatetime
        {...json}
        onChange={question.setValue}
      />
    );
  }

  return (
    <QuestionText
      {...json}
      onChange={question.setValue}
      value={question.value}
    />
  );
}


interface Props {
  questions: any;
  // onValueChange: (name, value, comment?) => {};
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

  renderQuestion = (question) => {
    const json = question.json;
    // const onChange = (value, comment) =>
    //   this.props.onValueChange(json.name, value, comment);
    // const newJson = {
    //   ...json,
    //   ...question,
    //   onChange,
    // };
    const build = this.typeBuilderMap[json.type];
    const content = build(question);
    const {
      number = null,
      title = null,
      name,
      showTitle = true,
    } = json;
    if (!question.visible) {
      return null;
    }
    return (
      <View key={json.name}>
        {
          showTitle &&
          <Text>{number ? `${number}.` : ''} {title || name}</Text>
        }
        {
          question.error &&
          <Text>{question.error}</Text>
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

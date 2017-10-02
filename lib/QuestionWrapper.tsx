import React from 'react';
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
import QuestionTextWrapper from './QuestionTextWrapper';

import styles from './styles/questionWrapper';


const commonBuilderCreator = Component => question =>
  <Component
    {...question.json}
    value={question.value}
    comment={question.comment}
    onChange={question.setValue}
  />;

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

const booleanBuilder = question => {
  const {
    json: {
      valueTrue = true,
    valueFalse = false,
    },
    value,
  } = question;
  const checked = value === valueTrue;
  const onChange = (checked) => {
    const value = checked ? valueTrue : valueFalse;
    question.setValue(value);
  }
  return (
    <QuestionBoolean
      {...question.json}
      value={checked}
      comment={question.comment}
      onChange={onChange}
    />
  );
};

const generateRateValues = (min, max, step) => {
  const rateValues = [];
  for (let i = min; i <= max; i += step) {
    rateValues.push({
      value: i,
      text: i,
    });
  }
  return rateValues;
};

const ratingBuilder = question => {
  const {
    json: {
      rateValues = null,
    rateMax = 5,
    rateMin = 1,
    rateStep = 1,
    },
  } = question;

  const newRateValues = rateValues || generateRateValues(rateMin, rateMax, rateStep);

  console.log('rateVlua: ', newRateValues);
  return (
    <QuestionRate
      {...question.json}
      rateValues={newRateValues}
      value={question.value}
      comment={question.comment}
      onChange={question.setValue}
    />
  );
};


const commentBuilder = question => (
  <QuestionText
    {...question.json}
    multiline
    value={question.value}
    comment={question.comment}
    onChange={question.setValue}
  />
);


interface Props {
  question: any;
  // onValueChange: (name, value, comment?) => {};
}

@observer
export default class QuestionWrapper extends React.Component<Props, any> {
  panelBuilder = question => (
    <View>
      {question.json.elements.map((json) => {
        return this.renderQuestion({
          type: json.type,
          json: json,
        })
      })}
    </View>
  )

  panelDynamicBuilder = json => (
    <QuestionPanelDynamic
      {...json}
      buildComponent={this.renderQuestion}
    />
  )

  multipleTextBuilder = question => (
    <QuestionMultipleText
      {...question.json}
      questions={question.questions}
      onChange={question.setValue}
    />
  )

  private typeBuilderMap = {
    text: commonBuilderCreator(QuestionTextWrapper),
    checkbox: choiceBuilderCreator(QuestionCheckbox),
    radiogroup: choiceBuilderCreator(QuestionRadiogroup),
    dropdown: choiceBuilderCreator(QuestionActionsheet),
    comment: commentBuilder,
    boolean: booleanBuilder,
    rating: ratingBuilder,
    multipletext: this.multipleTextBuilder,
    panel: this.panelBuilder,
    paneldynamic: this.panelDynamicBuilder,
    html: commonBuilderCreator(QuestionHtml),
    file: commonBuilderCreator(QuestionFile),
  };

  renderQuestion = (question) => {
    const json = question.json || question;
    const build = this.typeBuilderMap[json.type];
    const content = build(question);
    const {
      title = null,
      name,
      showTitle = true,
    } = json;
    const {
      number = null,
    } = question;
    if (!question.visible) {
      return null;
    }
    return (
      <View key={json.name}>
        {
          showTitle && question.json.type !== 'html' &&
          <View style={styles.title}>
            <Text>{number ? `${number}.` : ''} {title || name}</Text>
          </View>
        }
        {
          question.error &&
          <View style={styles.error}>
            <Text style={styles.errorText}>{question.error}</Text>
          </View>
        }
        <View style={styles.questionContent}>
          {content}
        </View>
        {
          question.json.hasComment &&
          <QuestionText
            value={question.comment}
            onChange={question.setComment}
          />
        }

      </View>
    );
  }

  render() {
    return this.renderQuestion(this.props.question);
  }

}

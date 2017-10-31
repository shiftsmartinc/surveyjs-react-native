import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react/native';

import QuestionTextWrapper from './QuestionTextWrapper';

import styles from './styles/questionMultipleText';

export interface Props {
  items: Array<any>;
  questions: Array<any>;
  onChange(value);
}

@observer
export default class QuestionMultipleText extends React.Component<Props, any> {


  renderItem = (question, idx) => {
    const item = question.json;
    const isFirst = idx === 0;
    const onSubChange = (value) => {
      question.setValue(value);
      const multiValue = {};
      this.props.questions.forEach(subQuestion =>
        multiValue[subQuestion.json.name] = subQuestion.value
      );
      this.props.onChange(multiValue);
    };
    return (
      <View
        key={item.name}
        style={[styles.item, isFirst && styles.itemFirst]}
      >
        <Text style={styles.itemLabel}>
          {item.isRequired && '*'}
          {item.title || item.name}
        </Text>
        <View style={styles.itemInput}>
          <QuestionTextWrapper
            {...item}
            value={question.value}
            onChange={onSubChange}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.props.questions.map(this.renderItem)}
      </View>
    );
  }
}

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from 'mobx-react/native';
import QuestionTextWrapper from './QuestionTextWrapper';

const styles = StyleSheet.create({
  container: {
  },
  itemsContainer: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    padding: 5,
    borderTopWidth: 2,
    borderTopColor: '#333',
  },
  itemFirst: {
    borderTopWidth: 1,
  },
  itemLabel: {
    flex: 0.25,
  },
  itemInput: {
    flex: 0.75,
  },
});

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

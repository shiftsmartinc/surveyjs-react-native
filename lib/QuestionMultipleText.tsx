import * as React from 'react';
import { View, Text } from 'react-native';
import QuestionText from './QuestionText';

import styles from './styles/questionMultipleText';

interface Props {
  items: Array<any>;
}

export default class QuestionMultipleText extends React.Component<Props, any> {
  renderItem = (item, idx) => {
    const isFirst = idx === 0;
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
          <QuestionText {...item} />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.props.items.map(this.renderItem)}
      </View>
    );
  }
}

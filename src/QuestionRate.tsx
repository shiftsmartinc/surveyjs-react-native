import * as React from 'react';
import { View, Text } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';

import styles from './styles/questionRate';

interface Props {
  rateValues: Array<any>;
  minRateDescription?: string;
  maxRateDescription?: string;
  value?: any;
  onChange(value, comment?);
}

export default class QuestionRate extends React.Component<Props, any> {

  onItemChecked = (value) => {
    this.props.onChange(value);
  }

  render() {
    const {
      rateValues = [],
      minRateDescription = '',
      maxRateDescription = '',
      value
    } = this.props;

    const itemsMaxIdx = rateValues.length - 1;
    return (
      <View style={styles.container}>
        {rateValues.map((v, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === itemsMaxIdx;
          const checked = v.value === value;
          const textStyles = [
            styles.rateItemText,
            checked ? styles.rateItemTextChecked : null,
          ];
          return (
            <TouchableWithFeedback
              key={v.value}
              onPress={() => this.onItemChecked(v.value)}
            >
              <View
                style={[
                  styles.rateItem,
                  isLast && styles.lastRateItem,
                  checked && styles.checkedRateItem,
                ]}
              >
                {isFirst && <Text style={textStyles}>{minRateDescription}</Text>}
                <Text style={textStyles}>{v.text}</Text>
                {isLast && <Text style={textStyles}>{maxRateDescription}</Text>}
              </View>
            </TouchableWithFeedback>
          );
        })}
      </View>
    );
  }
}

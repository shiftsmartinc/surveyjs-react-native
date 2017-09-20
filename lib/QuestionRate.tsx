import * as React from 'react';
import { View, Text } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';

import styles from './styles/questionRate';

interface Props {
  rateValues: Array<any>;
  minRateDescription?: string;
  maxRateDescription?: string;
}

export default class QuestionRate extends React.Component<Props, any> {

  constructor(props) {
    super(props);

    this.state = {
      selectedValue: null,
    };
  }

  onItemChecked = (value) => {
    this.setState({
      selectedValue: value,
    });
  }

  render() {
    const {
      rateValues = [],
      minRateDescription = '',
      maxRateDescription = '',
    } = this.props;
    const itemsMaxIdx = rateValues.length - 1;
    return (
      <View style={styles.container}>
        {rateValues.map((v, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === itemsMaxIdx;
          const checked = v.value === this.state.selectedValue;
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
                {isFirst && <Text>{minRateDescription}</Text>}
                <Text style={styles.rateItemText}>{v.text}</Text>
                {isLast && <Text>{maxRateDescription}</Text>}
              </View>
            </TouchableWithFeedback>
          );
        })}
      </View>
    );
  }
}

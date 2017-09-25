import * as React from 'react';
import { View, Text } from 'react-native';

import styles from './styles/surveyNavigation';
import TouchableWithFeedback from './TouchableWithFeedback';

interface Props {
  onNextPage: () => {};
  onPrevPage: () => {};
  nextPageIndex: number;
  prevPageIndex: number;
}

export default class SurveyNavigation extends React.Component<Props, any> {
  render() {
    return (
      <View style={styles.container}>
        { this.props.prevPageIndex !== -1 &&
          <TouchableWithFeedback
            onPress={this.props.onPrevPage}
          >
            <Text>Prev Page </Text>
          </TouchableWithFeedback>
        }
        <TouchableWithFeedback
          onPress={this.props.onNextPage}
        >
          <Text>{this.props.nextPageIndex !== -1 ? 'Next Page' : 'Complete'}</Text>
        </TouchableWithFeedback>

      </View>
    );
  }
}

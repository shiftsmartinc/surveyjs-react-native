import React from 'react';
import { inject, observer } from 'mobx-react/native';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  survey: {
    flexGrow: 1,
  },
  results: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export interface Injected {
  isComplete?: boolean;
}

export interface Props {
}

@inject(({ model }) => ({
  isComplete: model.isComplete,
}))
@observer
export default class Survey extends React.Component<Injected & Props> {
  render() {
    const { isComplete } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {isComplete
          ? (
            <View style={styles.results}>
              <Text>Thank you for completing the survey!</Text>
            </View>
          )
          : (
            <View style={styles.survey}>
              <SurveyPage />
              <SurveyNavigation />
            </View>
          )
        }
      </ScrollView>
    );
  }
}

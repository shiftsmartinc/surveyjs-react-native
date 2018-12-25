import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
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

@inject((store: any) => ({
  isComplete: store.model.isComplete,
  currentPageProps: store.model.currentPageProps,
  setValue: store.model.setValue,
}))
@observer
export default class Survey extends React.Component<any> {
  render() {
    const { isComplete, currentPageProps, setValue } = this.props;
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
              <SurveyNavigation />
              <SurveyPage
                {...currentPageProps}
                onValueChange={setValue}
              />
            </View>
          )
        }
      </ScrollView>
    );
  }
}

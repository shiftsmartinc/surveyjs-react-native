import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';
import TouchableWithFeedback from './TouchableWithFeedback';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
  },
  results: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 24,
    marginBottom: 15,
    height: 50,
    backgroundColor: '#1a71cf',
    shadowColor: '#8eb8ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export interface SurveyProps {
  isComplete?: boolean;
  isPreview?: boolean;
  nextPage?: any;
  nextPageIndex?: number;
}

class Survey extends React.Component<SurveyProps> {
  render() {
    const { isComplete, isPreview, nextPageIndex, nextPage } = this.props;

    if (isComplete) {
      return (
        <View style={styles.results}>
          <Text>Thank you for completing the survey!</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        {!isPreview && <SurveyNavigation />}
        <SurveyPage />
        {!isPreview && (
          <TouchableWithFeedback style={styles.button} onPress={nextPage}>
            <Text style={styles.buttonText}>
              {nextPageIndex !== -1 ? 'Next' : 'Complete'}
            </Text>
          </TouchableWithFeedback>
        )}
      </SafeAreaView>
    );
  }
}

export default inject((store: any) => ({
  isComplete: store.model.isComplete,
  isPreview: store.model.isPreview,
  nextPage: store.model.nextPage,
  nextPageIndex: store.model.nextPageIndex,
}))(observer(Survey));

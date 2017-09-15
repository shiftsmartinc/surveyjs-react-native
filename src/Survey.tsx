import React from 'react';
import { View } from 'react-native';
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';

export default class Survey extends React.Component {
  render() {
    return (
      <View>
        <SurveyNavigation />
        <SurveyPage />
      </View>
    );
  }
}

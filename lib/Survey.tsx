import * as React from 'react';
import { ScrollView } from 'react-native';
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';

export default class Survey extends React.Component {
  render() {
    return (
      <ScrollView>
        <SurveyNavigation />
        <SurveyPage />
      </ScrollView>
    );
  }
}

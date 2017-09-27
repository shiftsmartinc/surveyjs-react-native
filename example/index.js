import React from 'react';
import { ScrollView, Alert } from 'react-native';
import Survey from '../lib';
import styles from './styles';

import surveyJson from './survey.json';

export default class Example extends React.Component {
  onComplete = (results) => {
    Alert.alert(
      'Complete',
      JSON.stringify(results),
      [
        { text: 'OK', onPress: () => {} },
      ],
      { cancelable: true }
    )
  }
  render() {
    const apis = {
      onComplete: this.onComplete,
    };
    return (
      <ScrollView style={{ backgroundColor: '#f8f8f8' }}>
        <Survey json={surveyJson} apis={apis} />
      </ScrollView>
    );
  }
}

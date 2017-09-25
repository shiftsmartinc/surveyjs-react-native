import React from 'react';
import { Alert } from 'react-native';
import Survey from '../lib';
import styles from './styles';

import surveyJson from './survey.json';

export default class Example extends React.Component {
  onComplete = () => {
    Alert.alert(
      'Complete',
      '',
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
      <Survey json={surveyJson} apis={apis} />
    );
  }
}

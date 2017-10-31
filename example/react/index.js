import React from 'react';
import { Alert } from 'react-native';
import Survey from 'surveyjs-react-native';
import { enableLogging } from 'mobx-logger';
import json from './survey.json';

enableLogging({
  predicate: () => __DEV__ && Boolean(global.navigator.userAgent),
  action: true,
  reaction: false,
  transaction: false,
  compute: false,
});

export default class Example extends React.Component {
  onComplete = (results) => {
    Alert.alert(
      'onComplete',
      JSON.stringify(results),
      [{ text: 'OK' }],
    )
  }
  onUpload = (value) => {
    Alert.alert(
      'onUpload',
      JSON.stringify(value),
      [{ text: 'OK' }],
    )
  }
  render () {
    return (
      <Survey
        json={json}
        apis={{
          onComplete: this.onComplete,
          onUpload: this.onUpload,
        }}
      />
    );
  }
}

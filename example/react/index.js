import React from 'react';
import { SafeAreaView } from 'react-native';
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
    console.log('onComplete', results);
  }
  onUpload = (value) => {
    console.log('onUpload', value);
  }
  render () {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Survey
          json={json}
          apis={{
            onComplete: this.onComplete,
            onUpload: this.onUpload,
          }}
        />
      </SafeAreaView>
    );
  }
}

import React from 'react';
import { View } from 'react-native';
import Survey from 'surveyjs-react-native';
import { enableLogging } from 'mobx-logger';
import json from './survey.json';

const isPreview = false;

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
      <View style={{ flex: 1 }}>
        <Survey
          json={json}
          apis={{
            onComplete: this.onComplete,
            onUpload: this.onUpload,
          }}
          isPreview={isPreview}
        />
      </View>
    );
  }
}

import React from 'react';
import { View, Text } from 'react-native';
import Survey from '../lib';
import styles from './styles';

import surveyJson from './survey.json';

export default class Example extends React.Component {
  render() {
    return (
      <Survey json={surveyJson} />
    );
  }
}

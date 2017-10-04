import React from 'react';
import { ScrollView, Text, Alert, Button } from 'react-native';
import Survey from 'surveyjs-react-native';
import styles from './styles';

import surveyJson from './survey.json';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isComplete: false,
    };
  }
  onComplete = (results) => {
    this.setState({ isComplete: true });
    Alert.alert(
      'Complete',
      JSON.stringify(results),
      [
        { text: 'OK', onPress: () => {} },
      ],
      { cancelable: true }
    )
  }

  onRestart = () => {
    this.setState({ isComplete: false });
  }

  renderResults() {
    return (
      <ScrollView contentContainerStyle={styles.results}>
        <Text>Thank you for taking the survey!</Text>

        <Button
          onPress={this.onRestart}
          title="Restart"
        />
      </ScrollView>
    )
  }
  renderSurvey() {
    const apis = {
      onComplete: this.onComplete,
    };
    return (
      <ScrollView style={{ backgroundColor: '#f8f8f8' }}>
        <Survey json={surveyJson} apis={apis} />
      </ScrollView>
    );
  }
  render () {
    return this.state.isComplete ? this.renderResults() : this.renderSurvey();
  }
}

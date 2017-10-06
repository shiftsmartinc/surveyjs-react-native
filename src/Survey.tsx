import * as React from 'react';
import { View, Text } from 'react-native';
import { observer } from "mobx-react";
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';
import SurveyStore from './store/survey';

import styles from './styles/survey';

interface Props {
  json: any;
  apis: any;
}

@observer
export default class Survey extends React.Component<Props, any> {
  private store;

  constructor(props) {
    super(props);

    this.store = new SurveyStore(this.props.json, this.props.apis);
  }

  renderResults() {
    return (
      <View style={styles.results}>
        <Text>Thank you for completing the survey!</Text>
      </View>
    );
  }

  renderSurvey() {
    return (
      <View style={styles.container}>
        <SurveyPage
          {...this.store.currentPageProps}
          onValueChange={this.store.setValue}
        />
        <SurveyNavigation
          onNextPage={this.store.nextPage}
          onPrevPage={this.store.prevPage}
          nextPageIndex={this.store.nextPageIndex}
          prevPageIndex={this.store.prevPageIndex}
        />
      </View>
    );
  }

  render() {
    return this.store.isComplete ? this.renderResults() : this.renderSurvey();
  }
}

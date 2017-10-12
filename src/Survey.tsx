import * as React from 'react';
import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';
import styles from './styles/survey';

interface Props {
  store: any;
}

@inject('store')
@observer
export default class Survey extends React.Component<Props, any> {

  renderResults() {
    return (
      <View style={styles.results}>
        <Text>Thank you for completing the survey!</Text>
      </View>
    );
  }

  renderSurvey() {
    const { store } = this.props;
    return (
      <View style={styles.container}>
        <SurveyPage
          {...store.currentPageProps}
          onValueChange={store.setValue}
        />
        <SurveyNavigation
          onNextPage={store.nextPage}
          onPrevPage={store.prevPage}
          nextPageIndex={store.nextPageIndex}
          prevPageIndex={store.prevPageIndex}
        />
      </View>
    );
  }

  render() {
    const { store } = this.props;
    return store.isComplete ? this.renderResults() : this.renderSurvey();
  }
}

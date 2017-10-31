import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';
import styles from './styles/survey';

export interface Props {
  store: any;
}

@inject('store')
@observer
export default class Survey extends React.Component<Props, any> {
  render() {
    const { store } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {store.isComplete
          ? <View style={styles.results}>
            <Text>Thank you for completing the survey!</Text>
          </View>
          : <View style={styles.survey}>
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
        }
      </ScrollView>
    );
  }
}

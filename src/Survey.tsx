import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f8f8',
  },
  survey: {
    flexGrow: 1,
  },
  results: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

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

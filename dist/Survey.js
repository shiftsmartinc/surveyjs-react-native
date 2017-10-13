var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';
import styles from './styles/survey';
let Survey = class Survey extends React.Component {
    render() {
        const { store } = this.props;
        return (<ScrollView contentContainerStyle={styles.container}>
        {store.isComplete
            ? <View style={styles.results}>
            <Text>Thank you for completing the survey!</Text>
          </View>
            : <View style={styles.survey}>
            <SurveyPage {...store.currentPageProps} onValueChange={store.setValue}/>
            <SurveyNavigation onNextPage={store.nextPage} onPrevPage={store.prevPage} nextPageIndex={store.nextPageIndex} prevPageIndex={store.prevPageIndex}/>
          </View>}
      </ScrollView>);
    }
};
Survey = __decorate([
    inject('store'),
    observer
], Survey);
export default Survey;

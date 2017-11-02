var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { inject, observer } from 'mobx-react/native';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
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
let Survey = class Survey extends React.Component {
    render() {
        const { isComplete } = this.props;
        return (<ScrollView contentContainerStyle={styles.container}>
        {isComplete
            ? (<View style={styles.results}>
              <Text>Thank you for completing the survey!</Text>
            </View>)
            : (<View style={styles.survey}>
              <SurveyPage />
              <SurveyNavigation />
            </View>)}
      </ScrollView>);
    }
};
Survey = __decorate([
    inject(({ model }) => ({
        isComplete: model.isComplete,
    })),
    observer
], Survey);
export default Survey;

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';
import TouchableWithFeedback from './TouchableWithFeedback';
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fafafa',
    },
    results: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 24,
        marginBottom: 15,
        height: 50,
        backgroundColor: '#1a71cf',
        shadowColor: '#8eb8ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
});
let Survey = class Survey extends React.Component {
    render() {
        const { isComplete, isPreview, nextPageIndex, nextPage } = this.props;
        if (isComplete) {
            return (<View style={styles.results}>
          <Text>Thank you for completing the survey!</Text>
        </View>);
        }
        return (<SafeAreaView style={styles.container}>
        {!isPreview && <SurveyNavigation />}
        <SurveyPage />
        <TouchableWithFeedback style={styles.button} onPress={nextPage}>
          <Text style={styles.buttonText}>{nextPageIndex !== -1 ? 'Next' : 'Complete'}</Text>
        </TouchableWithFeedback>
      </SafeAreaView>);
    }
};
Survey = __decorate([
    inject((store) => ({
        isComplete: store.model.isComplete,
        isPreview: store.model.isPreview,
        nextPageIndex: store.model.nextPageIndex,
        nextPage: store.model.nextPage,
    })),
    observer
], Survey);
export default Survey;

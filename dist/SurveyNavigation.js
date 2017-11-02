var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { inject, observer } from 'mobx-react/native';
import { StyleSheet, View, Text } from 'react-native';
import colors from './colors';
import TouchableWithFeedback from './TouchableWithFeedback';
const styles = StyleSheet.create({
    container: {
        height: 44,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
    },
    button: {
        padding: 5,
        marginLeft: 5,
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 3,
    },
    buttonText: {
        color: colors.white,
    }
});
let SurveyNavigation = class SurveyNavigation extends React.Component {
    render() {
        const { prevPage, nextPage, prevPageIndex, nextPageIndex } = this.props;
        return (<View style={styles.container}>
        {prevPageIndex !== -1 &&
            <TouchableWithFeedback onPress={prevPage}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableWithFeedback>}
        <TouchableWithFeedback onPress={nextPage}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{nextPageIndex !== -1 ? 'Next' : 'Complete'}</Text>
          </View>
        </TouchableWithFeedback>

      </View>);
    }
};
SurveyNavigation = __decorate([
    inject(({ model }) => ({
        prevPage: model.prevPage,
        nextPage: model.nextPage,
        prevPageIndex: model.prevPageIndex,
        nextPageIndex: model.nextPageIndex,
    })),
    observer
], SurveyNavigation);
export default SurveyNavigation;

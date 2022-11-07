var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from 'mobx-react';
import QuestionTextWrapper from './QuestionTextWrapper';
const styles = StyleSheet.create({
    container: {},
    itemsContainer: {
        flexDirection: 'column',
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        alignItems: 'center',
    },
    itemFirst: {
        borderTopWidth: 0,
    },
    itemLabel: {
        flex: 0.25,
    },
    itemInput: {
        flex: 0.75,
    },
});
let QuestionMultipleText = class QuestionMultipleText extends React.Component {
    renderItem = (question, idx) => {
        const item = question.json;
        const isFirst = idx === 0;
        const onSubChange = (value) => {
            question.setValue(value);
            const multiValue = {};
            this.props.questions.forEach(subQuestion => multiValue[subQuestion.json.name] = subQuestion.value);
            this.props.onChange(multiValue);
        };
        return (<View key={item.name} style={[styles.item, isFirst && styles.itemFirst]}>
        <Text style={styles.itemLabel}>
          {item.isRequired && '*'}
          {item.title || item.name}
        </Text>
        <View style={styles.itemInput}>
          <QuestionTextWrapper {...item} value={question.value} onChange={onSubChange}/>
        </View>
      </View>);
    };
    render() {
        return (<View>
        {this.props.questions.map(this.renderItem)}
      </View>);
    }
};
QuestionMultipleText = __decorate([
    observer
], QuestionMultipleText);
export default QuestionMultipleText;

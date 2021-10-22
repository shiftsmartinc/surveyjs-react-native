var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import QuestionText from './QuestionText';
import QuestionCheckbox from './QuestionCheckbox';
import QuestionRadiogroup from './QuestionRadiogroup';
import QuestionDropdown from './QuestionDropdown';
import QuestionRate from './QuestionRate';
import QuestionBoolean from './QuestionBoolean';
import QuestionMultipleText from './QuestionMultipleText';
import QuestionPanelDynamic from './QuestionPanelDynamic';
import QuestionHtml from './QuestionHtml';
import QuestionFile from './QuestionFile';
import QuestionTextWrapper from './QuestionTextWrapper';
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    title: {
        marginHorizontal: 24,
    },
    previewTitle: {
        padding: 10,
        backgroundColor: '#e5f2ff',
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#113260',
    },
    previewTitleText: {
        fontWeight: 'normal',
        color: '#4471a0',
    },
    error: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        paddingHorizontal: 32,
        height: 37,
        backgroundColor: '#ff7171',
    },
    errorText: {
        fontSize: 13,
        color: '#fff',
    },
    questionContent: {
        paddingVertical: 16,
    },
});
const sortArray = (array, mult) => {
    return array.sort(function (a, b) {
        if (a.text < b.text)
            return -1 * mult;
        if (a.text > b.text)
            return 1 * mult;
        return 0;
    });
};
const randomizeArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};
const commonBuilderCreator = Component => question => <Component {...question.json} value={question.value} comment={question.comment} onChange={question.setValue}/>;
const choiceBuilderCreator = Component => (question) => {
    const json = question.json;
    let choices = json.choices.map(v => typeof v === 'string' ? { value: v, text: v } : v);
    if (json.choicesOrder && json.choicesOrder !== "none") {
        let order = json.choicesOrder.toLowerCase();
        if (order == "asc") {
            choices = sortArray(choices, 1);
        }
        else if (order == "desc") {
            choices = sortArray(choices, -1);
        }
        else if (order == "random") {
            choices = randomizeArray(choices);
        }
    }
    return (<Component {...json} choices={choices} value={question.value} comment={question.comment} onChange={question.setValue}/>);
};
const booleanBuilder = question => {
    const { json: { valueTrue = true, valueFalse = false, }, value, } = question;
    const checked = value === valueTrue;
    const onChange = (checked) => {
        const value = checked ? valueTrue : valueFalse;
        question.setValue(value);
    };
    return (<QuestionBoolean {...question.json} value={checked} comment={question.comment} onChange={onChange}/>);
};
const generateRateValues = (min, max, step) => {
    const rateValues = [];
    for (let i = min; i <= max; i += step) {
        rateValues.push({
            value: i,
            text: i,
        });
    }
    return rateValues;
};
const ratingBuilder = question => {
    const { json: { rateValues = null, rateMax = 5, rateMin = 1, rateStep = 1, }, } = question;
    const newRateValues = rateValues || generateRateValues(rateMin, rateMax, rateStep);
    return (<QuestionRate {...question.json} rateValues={newRateValues} value={question.value} comment={question.comment} onChange={question.setValue}/>);
};
const commentBuilder = question => (<QuestionText {...question.json} value={question.value} comment={question.comment} onChange={question.setValue}/>);
let QuestionWrapper = class QuestionWrapper extends React.Component {
    constructor() {
        super(...arguments);
        this.panelBuilder = question => (<View>
      {question.json.elements.map((json) => {
            return this.renderQuestion({
                type: json.type,
                json: json,
            });
        })}
    </View>);
        this.panelDynamicBuilder = json => (<QuestionPanelDynamic {...json} buildComponent={this.renderQuestion}/>);
        this.multipleTextBuilder = question => (<QuestionMultipleText {...question.json} questions={question.questions} onChange={question.setValue}/>);
        this.typeBuilderMap = {
            text: commonBuilderCreator(QuestionTextWrapper),
            checkbox: choiceBuilderCreator(QuestionCheckbox),
            radiogroup: choiceBuilderCreator(QuestionRadiogroup),
            dropdown: choiceBuilderCreator(QuestionDropdown),
            comment: commentBuilder,
            boolean: booleanBuilder,
            rating: ratingBuilder,
            multipletext: this.multipleTextBuilder,
            panel: this.panelBuilder,
            paneldynamic: this.panelDynamicBuilder,
            html: commonBuilderCreator(QuestionHtml),
            file: commonBuilderCreator(QuestionFile),
        };
        this.renderQuestion = (question) => {
            const { isPreview } = this.props;
            const json = question.json || question;
            const build = this.typeBuilderMap[json.type];
            const content = build(question);
            const { title = null, name, showTitle = true, } = json;
            const { number = null, } = question;
            if (!question.visible) {
                return null;
            }
            return (<View key={json.name} style={styles.container}>
        {showTitle && question.json.type !== 'html' &&
                <View style={[styles.title, isPreview && styles.previewTitle]}>
            <Text style={[styles.titleText, isPreview && styles.previewTitleText]}>
              {number ? `${number}.` : ''} {title || name}
            </Text>
          </View>}
        {question.error &&
                <View style={styles.error}>
            <Text style={styles.errorText}>{question.error}</Text>
          </View>}
        <View style={styles.questionContent}>
          {content}
        </View>
        {question.json.hasComment &&
                <QuestionText value={question.comment} onChange={question.setComment}/>}
      </View>);
        };
    }
    render() {
        return this.renderQuestion(this.props.question);
    }
};
QuestionWrapper = __decorate([
    inject((store) => ({
        isPreview: store.model.isPreview,
    })),
    observer
], QuestionWrapper);
export default QuestionWrapper;

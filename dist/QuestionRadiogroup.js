import React from 'react';
import { View } from 'react-native';
import RadioItem from './QuestionRadioItem';
import QuestionText from './QuestionText';
const OTHER_VALUE = 'other';
const DEFAULT_OTHER_TEXT = 'other (describe)';
const ALPHABET = [...Array(26)].map((_e, i) => (i + 10).toString(36).toUpperCase());
export default class QuestionRadiogroup extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChoicesChange = (value) => {
            this.props.onChange(value);
        };
        this.handleTextInputChange = (comment) => {
            this.props.onChange(this.props.value, comment);
        };
    }
    render() {
        const { otherText = DEFAULT_OTHER_TEXT, choices = [], } = this.props;
        const generatedChoices = choices.length > 26 ? choices : choices.map((c, i) => ({ ...c, label: ALPHABET[i] }));
        return (<View>
        {generatedChoices.map(v => <RadioItem key={v.value} label={v.label} value={v.value} text={v.text} checked={this.props.value === v.value} onChange={this.handleChoicesChange}/>)}
        {this.props.hasOther &&
            <View>
            <RadioItem value={OTHER_VALUE} text={otherText} checked={this.props.value === OTHER_VALUE} onChange={this.handleChoicesChange}/>
            {this.props.value === OTHER_VALUE &&
                <QuestionText onChange={this.handleTextInputChange} value={this.props.comment} placeholder={otherText}/>}
          </View>}
      </View>);
    }
}

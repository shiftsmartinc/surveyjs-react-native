import * as React from 'react';
import { View } from 'react-native';
import RadioItem from './QuestionRadioItem';
import QuestionText from './QuestionText';
const OTHER_VALUE = 'other';
const DEFAULT_OTHER_TEXT = 'other (describe)';
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
        return (<View>
        {choices.map(v => <RadioItem key={v.value} value={v.value} text={v.text} checked={this.props.value === v.value} onChange={this.handleChoicesChange}/>)}
        {this.props.hasOther &&
            <View>
            <RadioItem value={OTHER_VALUE} text={otherText} checked={this.props.value === OTHER_VALUE} onChange={this.handleChoicesChange}/>
            {this.props.value === OTHER_VALUE &&
                <QuestionText onChange={this.handleTextInputChange} value={this.props.comment} placeholder={otherText}/>}
          </View>}
      </View>);
    }
}

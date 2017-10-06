import * as React from 'react';
import { View } from 'react-native';
import CheckboxItem from './QuestionCheckboxItem';
import QuestionText from './QuestionText';
const OTHER_VALUE = 'other';
const DEFAULT_OTHER_TEXT = 'other (describe)';
export default class QuestionCheckbox extends React.Component {
    constructor() {
        super(...arguments);
        this.handleChoicesChange = (checked, value) => {
            const valueSet = new Set(this.props.value);
            if (checked) {
                valueSet.add(value);
            }
            else {
                valueSet.delete(value);
            }
            this.props.onChange([...valueSet]);
        };
        this.handleCommentChange = (comment) => {
            this.props.onChange(this.props.value, comment);
        };
    }
    render() {
        const { comment = '', otherText = DEFAULT_OTHER_TEXT, } = this.props;
        const value = this.props.value || [];
        const otherChecked = value.indexOf(OTHER_VALUE) !== -1;
        return (<View>
        {this.props.choices.map(v => <CheckboxItem key={v.value} value={v.value} text={v.text} checked={value.indexOf(v.value) !== -1} onChange={this.handleChoicesChange}/>)}
        {this.props.hasOther &&
            <View>
            <CheckboxItem value={OTHER_VALUE} text={otherText} checked={otherChecked} onChange={this.handleChoicesChange}/>
            {otherChecked &&
                <QuestionText value={comment} onChange={this.handleCommentChange} placeholder={otherText}/>}
          </View>}
      </View>);
    }
}

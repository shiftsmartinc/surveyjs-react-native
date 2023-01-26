import React from 'react';
import { Slider } from 'react-native';
export default class QuestionTextSlider extends React.Component {
    render() {
        const { value } = this.props;
        return (<Slider minimumValue={0} maximumValue={100} value={value} step={1} onValueChange={this.props.onChange}/>);
    }
}

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from './colors';
import TouchableWithFeedback from './TouchableWithFeedback';
import QuestionText from './QuestionText';
import ActionSheet from 'react-native-actionsheet';
const styles = StyleSheet.create({
    caption: {
        padding: 5,
        marginLeft: 5,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 3,
    },
    captionText: {
        color: colors.primary,
        textAlign: 'center',
    },
    otherTextInput: {
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 5,
    },
});
const OTHER_VALUE = 'other';
const DEFAULT_OTHER_TEXT = 'other (describe)';
const DEFAULT_OPTION_CAPTION = 'select';
export default class QuestionActionsheet extends React.Component {
    constructor(props) {
        super(props);
        this.handleCommentChange = (comment) => {
            this.props.onChange(this.props.value, comment);
        };
        this.onSelect = (index) => {
            const { options } = this.state;
            if (index !== options.length) {
                this.props.onChange(options[index].value);
            }
            else {
                this.props.onChange(null);
            }
        };
        this.state = {
            options: [],
        };
    }
    componentWillMount() {
        const options = [
            ...this.props.choices,
        ];
        if (this.props.hasOther) {
            options.push({
                value: OTHER_VALUE,
                text: this.props.otherText || DEFAULT_OTHER_TEXT,
            });
        }
        this.setState({ options });
    }
    render() {
        const { optionsCaption = DEFAULT_OPTION_CAPTION } = this.props;
        const { otherText = DEFAULT_OTHER_TEXT, value, comment, } = this.props;
        const selectedChocie = [
            ...this.props.choices,
            {
                value: OTHER_VALUE,
                text: otherText,
            }
        ].find(v => v.value === value);
        const { options } = this.state;
        const caption = selectedChocie ? selectedChocie.text : optionsCaption;
        return (<View>
        <TouchableWithFeedback onPress={() => this.ActionSheet.show()}>
          <View style={styles.caption}>
            <Text style={styles.captionText}>{caption}</Text>
          </View>
        </TouchableWithFeedback>
        {value === OTHER_VALUE &&
            <QuestionText value={comment} onChange={this.handleCommentChange} placeholder={otherText}/>}
        <ActionSheet ref={(ref) => { this.ActionSheet = ref; }} title={optionsCaption} options={[...options.map(option => option.text), 'Cancel']} destructiveButtonIndex={options.findIndex(option => option.value === value)} cancelButtonIndex={options.length} onPress={this.onSelect}/>
      </View>);
    }
}

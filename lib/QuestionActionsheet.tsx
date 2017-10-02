import * as React from 'react';
import { View, Text } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';
import QuestionText from './QuestionText';
import ActionSheet from 'react-native-actionsheet';


import styles from './styles/questionActionsheet';

interface Props {
  choices: any;
  hasOther?: boolean;
  optionsCaption?: string;
  value: string;
  comment?: string;
  otherText?: string;
  onChange(value, comment?);
}

const OTHER_VALUE = 'other';
const DEFAULT_OTHER_TEXT = 'other (describe)';

const DEFAULT_OPTION_CAPTION = 'select';


export default class QuestionActionsheet extends React.Component<Props, any>{

  ActionSheet;

  constructor(props) {
    super(props);

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
      })
    }
    this.setState({ options });
  }

  handleCommentChange = (comment) => {
    this.props.onChange(this.props.value, comment);
  }

  onSelect = (index) => {
    const { options } = this.state;
    if (index !== options.length) {
      this.props.onChange(options[index].value);
    } else {
      this.props.onChange(null);
    }
  }

  render() {
    const { optionsCaption = DEFAULT_OPTION_CAPTION } = this.props;
    const {
      otherText = DEFAULT_OTHER_TEXT,
      value,
      comment,
    } = this.props;
    const selectedChocie = [
      ...this.props.choices,
      {
        value: OTHER_VALUE,
        text: otherText,
      }
    ].find(v => v.value === value);
    const { options } = this.state;
    const caption = selectedChocie ? selectedChocie.text : optionsCaption;
    return (
      <View>
        <TouchableWithFeedback
          onPress={() => this.ActionSheet.show()}

        >
          <View style={styles.caption}>
            <Text style={styles.captionText}>{caption}</Text>
          </View>
        </TouchableWithFeedback>
        {
          value === OTHER_VALUE &&
          <QuestionText
            value={comment}
            onChange={this.handleCommentChange}
            placeholder={otherText}
          />
        }
        <ActionSheet
          ref={(ref) => { this.ActionSheet = ref; }}
          title={optionsCaption}
          options={[...options.map(option => option.text), 'Cancel']}
          // tintColor={colors.blue}
          destructiveButtonIndex={options.findIndex(option => option.value === value)}
          cancelButtonIndex={options.length}
          onPress={this.onSelect}
        />
      </View>
    )
  }
}

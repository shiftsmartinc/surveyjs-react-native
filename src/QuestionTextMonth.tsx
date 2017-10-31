import React from 'react';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';
import QuestionActionsheet from './QuestionActionsheet';
import QuestionText from './QuestionText';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  year: {
    flex: 1,
  },
  month: {
    flex: 1,
  },
});

const MONTH_CHOICES = [
  { value: '01', text: 'January' },
  { value: '02', text: 'February' },
  { value: '03', text: 'March' },
  { value: '04', text: 'April' },
  { value: '05', text: 'May' },
  { value: '06', text: 'June' },
  { value: '07', text: 'July' },
  { value: '08', text: 'August' },
  { value: '09', text: 'September' },
  { value: '10', text: 'October' },
  { value: '11', text: 'November' },
  { value: '12', text: 'December' },
];

export default class QuestionTextMonth extends React.Component<any, any> {

  constructor(props) {
    super(props);

    this.state = {
      year: null,
      month: null,
    };
  }
  componentWillMount() {
    this.parseValue(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.parseValue(nextProps.value);
  }

  parseValue = (value) => {
    if (value) {
      const date = moment(value);
      this.setState({
        year: date.format('YYYY'),
        month: date.format('MM'),
      });
    }
  }

  onYearChange = (year) => {
    this.setState({ year });
    if (this.state.month && year.length === 4) {
      this.props.onChange(`${year}-${this.state.month}`)
    }
  }

  onMonthChange = (month) => {
    this.setState({ month });
    if (this.state.year && month) {
      this.props.onChange(`${this.state.year}-${month}`)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.month}>
          <QuestionActionsheet
            value={this.state.month}
            onChange={this.onMonthChange}
            optionsCaption="Month"
            choices={MONTH_CHOICES}
          />
        </View>
        <View style={styles.year}>
          <QuestionText
            value={this.state.year}
            onChange={this.onYearChange}
            placeholder={`${new Date().getFullYear()}`}
          />
        </View>

      </View>
    )
  }
}

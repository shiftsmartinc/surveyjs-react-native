import * as React from 'react';
import { View, Text } from 'react-native';
import styles from './styles/surveyNavigation';
import TouchableWithFeedback from './TouchableWithFeedback';
export default class SurveyNavigation extends React.Component {
    render() {
        return (<View style={styles.container}>
        {this.props.prevPageIndex !== -1 &&
            <TouchableWithFeedback onPress={this.props.onPrevPage}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableWithFeedback>}
        <TouchableWithFeedback onPress={this.props.onNextPage}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{this.props.nextPageIndex !== -1 ? 'Next' : 'Complete'}</Text>
          </View>
        </TouchableWithFeedback>

      </View>);
    }
}

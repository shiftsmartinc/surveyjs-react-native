import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from './colors';
import TouchableWithFeedback from './TouchableWithFeedback';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  button: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    marginLeft: 5,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 3,
  },
  backButton: {
    backgroundColor: 'darkgray',
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  }
});

export interface Props {
  onNextPage: () => {};
  onPrevPage: () => {};
  nextPageIndex: number;
  prevPageIndex: number;
}

export default class SurveyNavigation extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        { this.props.prevPageIndex !== -1 &&
          <TouchableWithFeedback
            onPress={this.props.onPrevPage}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </TouchableWithFeedback>
        }
        <TouchableWithFeedback
          onPress={this.props.onNextPage}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>{this.props.nextPageIndex !== -1 ? 'Next' : 'Complete'}</Text>
          </View>
        </TouchableWithFeedback>
      </View>
    );
  }
}

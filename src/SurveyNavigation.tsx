import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from './colors';
import TouchableWithFeedback from './TouchableWithFeedback';

const styles = StyleSheet.create({
  container: {
    height: 44,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  button: {
    padding: 5,
    marginLeft: 5,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 3,
  },
  buttonText: {
    color: colors.white,
  }
});

export interface Props {
  onNextPage: () => {};
  onPrevPage: () => {};
  nextPageIndex: number;
  prevPageIndex: number;
}

export default class SurveyNavigation extends React.Component<Props, any> {
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

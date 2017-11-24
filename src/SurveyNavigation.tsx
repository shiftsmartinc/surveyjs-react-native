import React from 'react';
import { inject, observer } from 'mobx-react/native';
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

export interface Injected {
  prevPage?: any;
  nextPage?: any;
  prevPageIndex?: number;
  nextPageIndex?: number;
}

export interface Props {
}

@inject(({ model }) => ({
  prevPage: model.prevPage,
  nextPage: model.nextPage,
  prevPageIndex: model.prevPageIndex,
  nextPageIndex: model.nextPageIndex,
}))
@observer
export default class SurveyNavigation extends React.Component<Injected & Props> {
  render() {
    const { prevPage, nextPage, prevPageIndex, nextPageIndex } = this.props;
    return (
      <View style={styles.container}>
        { prevPageIndex !== -1 &&
          <TouchableWithFeedback style={[styles.button, styles.backButton]} onPress={prevPage}>
              <Text style={styles.buttonText}>Back</Text>
          </TouchableWithFeedback>
        }
        <TouchableWithFeedback style={styles.button} onPress={nextPage}>
          <Text style={styles.buttonText}>{nextPageIndex !== -1 ? 'Next' : 'Complete'}</Text>
        </TouchableWithFeedback>
      </View>
    );
  }
}

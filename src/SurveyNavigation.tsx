import React from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, View, Text } from 'react-native';
import TouchableWithFeedback from './TouchableWithFeedback';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#1a71cf',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 33,
    height: 33,
    backgroundColor: '#fff',
    shadowColor: '#8eb8ff',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#337ed9',
  },
  placeholder: {
    width: 33,
    height: 33,
  },
  title: {
    fontSize: 12,
    color: '#1a71cf',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export interface Props {
  prevPage?: () => {};
  nextPage?: () => {};
  prevPageIndex?: number;
  nextPageIndex?: number;
  curPageIndex?: number;
  pages?: Array<any>;
}

class SurveyNavigation extends React.Component {
  render() {
    const {
      prevPage,
      nextPage,
      prevPageIndex,
      curPageIndex,
      pages,
    } = this.props;
    return [
      <View key="navigation" style={styles.container}>
        {prevPageIndex !== -1
          ? (
            <TouchableWithFeedback
              onPress={prevPage}
              style={styles.button}
            >
              <Text style={styles.buttonText}>&lt;</Text>
            </TouchableWithFeedback>
          )
          : <View style={styles.placeholder} />
        }
        <Text style={styles.title}>
          Page <Text style={styles.bold}>{curPageIndex + 1}</Text> of <Text style={styles.bold}>{pages.length}</Text>
      </Text>
        <TouchableWithFeedback
          onPress={nextPage}
          style={styles.button}
        >
          <Text style={styles.buttonText}>&gt;</Text>
        </TouchableWithFeedback>
      </View>,
      <View key="progress-bar" style={[styles.progressBar, { width: `${(curPageIndex + 1) / pages.length * 100}%` }]} />,
    ];
  }
}

export default inject((store: any) => ({
  prevPage: store.model.prevPage,
  nextPage: store.model.nextPage,
  prevPageIndex: store.model.prevPageIndex,
  curPageIndex: store.model.curPageIndex,
  pages: store.model.pages,
}))(observer(SurveyNavigation));

import React from 'react';
import { inject, observer } from 'mobx-react/native';
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

@inject((store: any) => ({
  prevPage: store.model.prevPage,
  nextPage: store.model.nextPage,
  prevPageIndex: store.model.prevPageIndex,
  curPageIndex: store.model.curPageIndex,
  pages: store.model.pages,
}))
@observer
export default class SurveyNavigation extends React.Component<Props> {
  render() {
    const {
      prevPage,
      nextPage,
      prevPageIndex,
      curPageIndex,
      pages,
    } = this.props;
    return (
      <View style={styles.container}>
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
          <Text style={styles.bold}>{curPageIndex}</Text> of <Text style={styles.bold}>{pages.length}</Text> Answered
        </Text>
        <TouchableWithFeedback
          onPress={nextPage}
          style={styles.button}
        >
          <Text style={styles.buttonText}>&gt;</Text>
        </TouchableWithFeedback>
      </View>
    );
  }
}

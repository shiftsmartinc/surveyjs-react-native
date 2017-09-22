import * as React from 'react';
import { ScrollView } from 'react-native';
import { observer } from "mobx-react";
import SurveyNavigation from './SurveyNavigation';
import SurveyPage from './SurveyPage';
import Store from './store';


interface Props {
  json: any;
}

@observer
export default class Survey extends React.Component<Props, any> {
  private store;

  constructor(props) {
    super(props);

    this.store = new Store(this.props.json);
  }

  render() {
    return (
      <ScrollView>

        <SurveyPage {...this.store.currentPageProps} />
        <SurveyNavigation
          onNextPage={this.store.nextPage}
          onPrevPage={this.store.prevPage}
          hasNextPage={this.store.hasNextPage}
          hasPrevPage={this.store.hasPrevPage}
        />
      </ScrollView>
    );
  }
}

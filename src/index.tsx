import React from 'react';
import { Provider } from 'mobx-react/native';
import Survey from './Survey';
import SurveyStore from './store/survey';

export interface Props {
  json: any;
  apis: any;
}

export default class Factory extends React.PureComponent<Props, any> {
  private store = new SurveyStore(this.props.json, this.props.apis);

  render() {
    return (
      <Provider>
        <Survey store={this.store} />
      </Provider>
    )
  }
}

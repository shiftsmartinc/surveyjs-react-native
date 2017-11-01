import React from 'react';
import { Provider } from 'mobx-react/native';
import Survey from './Survey';
import Model from './Model';

export interface Props {
  json: any;
  apis: any;
}

export default class Factory extends React.PureComponent<Props, any> {
  private model = new Model(this.props.json, this.props.apis);

  render() {
    return (
      <Provider>
        <Survey store={this.model} />
      </Provider>
    )
  }
}

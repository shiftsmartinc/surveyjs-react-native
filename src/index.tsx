import React from 'react';
import { Provider } from 'mobx-react';
import Survey from './Survey';
import Model from './Model';

export interface Props {
  json: any;
  apis: any;
  isPreview?: boolean;
}

export default class Factory extends React.PureComponent<Props> {
  private model = new Model(this.props);

  render() {
    return (
      <Provider model={this.model}>
        <Survey />
      </Provider>
    )
  }
}

import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import Survey from './Survey';
import Model from './Model';

export interface FactoryProps {
  apis: any;
  isPreview?: boolean;
  json: any;
}

configure({ enforceActions: 'never' });

export default class Factory extends React.PureComponent<FactoryProps> {
  private model = new Model(this.props);

  render() {
    return (
      <Provider model={this.model}>
        <Survey />
      </Provider>
    );
  }
}

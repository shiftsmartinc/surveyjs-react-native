import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import Survey from './Survey';
import Model from './Model';
configure({ enforceActions: 'never' });
export default class Factory extends React.PureComponent {
    model = new Model(this.props);
    render() {
        return (<Provider model={this.model}>
        <Survey />
      </Provider>);
    }
}

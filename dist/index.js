import React from 'react';
import { Provider } from 'mobx-react/native';
import Survey from './Survey';
import SurveyStore from './store/survey';
export default class Factory extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.store = new SurveyStore(this.props.json, this.props.apis);
    }
    render() {
        return (<Provider>
        <Survey store={this.store}/>
      </Provider>);
    }
}

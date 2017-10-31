/// <reference types="react" />
import React from 'react';
export interface Props {
    json: any;
    apis: any;
}
export default class Factory extends React.PureComponent<Props, any> {
    private store;
    render(): JSX.Element;
}

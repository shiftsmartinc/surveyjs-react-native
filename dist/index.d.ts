import React from 'react';
export interface Props {
    json: any;
    apis: any;
    isPreview?: boolean;
}
export default class Factory extends React.PureComponent<Props> {
    private model;
    render(): JSX.Element;
}

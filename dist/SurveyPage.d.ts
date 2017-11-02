/// <reference types="react" />
import React from 'react';
export interface Injected {
    pages?: Array<any>;
    curPageIndex?: number;
    questions?: Array<any>;
}
export interface Props {
}
export default class SurveyPage extends React.Component<Injected & Props> {
    render(): JSX.Element;
}

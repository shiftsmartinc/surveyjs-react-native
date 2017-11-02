/// <reference types="react" />
import React from 'react';
export interface Injected {
    prevPage?: any;
    nextPage?: any;
    prevPageIndex?: number;
    nextPageIndex?: number;
}
export interface Props {
}
export default class SurveyNavigation extends React.Component<Injected & Props> {
    render(): JSX.Element;
}

/// <reference types="react" />
import React from 'react';
export interface Props {
    onNextPage: () => {};
    onPrevPage: () => {};
    nextPageIndex: number;
    prevPageIndex: number;
}
export default class SurveyNavigation extends React.Component<Props, any> {
    render(): JSX.Element;
}

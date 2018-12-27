import React from 'react';
export interface Props {
    prevPage?: () => {};
    nextPage?: () => {};
    prevPageIndex?: number;
    nextPageIndex?: number;
    curPageIndex?: number;
    pages?: Array<any>;
}
export default class SurveyNavigation extends React.Component<Props> {
    render(): JSX.Element[];
}

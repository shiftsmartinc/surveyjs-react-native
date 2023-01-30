import React from 'react';
export interface SurveyNavigationProps {
    curPageIndex?: number;
    nextPage?: () => {};
    nextPageIndex?: number;
    pages?: Array<any>;
    prevPage?: () => {};
    prevPageIndex?: number;
}
declare class SurveyNavigation extends React.Component<SurveyNavigationProps> {
    render(): JSX.Element[];
}
declare const _default: typeof SurveyNavigation & import("mobx-react").IWrappedComponent<{}>;
export default _default;

import React from 'react';
export interface SurveyProps {
    isComplete?: boolean;
    isPreview?: boolean;
    nextPage?: any;
    nextPageIndex?: number;
}
declare class Survey extends React.Component<SurveyProps> {
    render(): JSX.Element;
}
declare const _default: typeof Survey & import("mobx-react").IWrappedComponent<{}>;
export default _default;

import React from 'react';
export interface QuestionWrapperProps {
    isPreview?: boolean;
    question?: any;
}
declare class QuestionWrapper extends React.Component<QuestionWrapperProps> {
    panelBuilder: (question: any) => JSX.Element;
    panelDynamicBuilder: (json: any) => JSX.Element;
    multipleTextBuilder: (question: any) => JSX.Element;
    private typeBuilderMap;
    renderQuestion: (question: any) => JSX.Element;
    render(): JSX.Element;
}
declare const _default: typeof QuestionWrapper & import("mobx-react").IWrappedComponent<{}>;
export default _default;

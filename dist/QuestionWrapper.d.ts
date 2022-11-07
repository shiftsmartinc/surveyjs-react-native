import React from 'react';
export default class QuestionWrapper extends React.Component<any> {
    panelBuilder: (question: any) => JSX.Element;
    panelDynamicBuilder: (json: any) => JSX.Element;
    multipleTextBuilder: (question: any) => JSX.Element;
    private typeBuilderMap;
    renderQuestion: (question: any) => JSX.Element;
    render(): JSX.Element;
}

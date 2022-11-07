import React from 'react';
export default class QuestionWrapper extends React.Component<any> {
    panelBuilder: (question: any) => any;
    panelDynamicBuilder: (json: any) => any;
    multipleTextBuilder: (question: any) => any;
    private typeBuilderMap;
    renderQuestion: (question: any) => any;
    render(): any;
}

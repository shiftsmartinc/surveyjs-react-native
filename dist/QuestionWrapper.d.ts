/// <reference types="react" />
import React from 'react';
export interface Props {
    question: any;
}
export default class QuestionWrapper extends React.Component<Props> {
    panelBuilder: (question: any) => JSX.Element;
    panelDynamicBuilder: (json: any) => JSX.Element;
    multipleTextBuilder: (question: any) => JSX.Element;
    private typeBuilderMap;
    renderQuestion: (question: any) => JSX.Element;
    render(): JSX.Element;
}

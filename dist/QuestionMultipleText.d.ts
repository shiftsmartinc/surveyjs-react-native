import React from 'react';
export interface Props {
    items: Array<any>;
    questions: Array<any>;
    onChange(value: any): any;
}
export default class QuestionMultipleText extends React.Component<Props> {
    renderItem: (question: any, idx: any) => JSX.Element;
    render(): JSX.Element;
}

import React from 'react';
export interface QuestionMultipleTextProps {
    items: Array<any>;
    onChange(value: any): any;
    questions: Array<any>;
}
declare class QuestionMultipleText extends React.Component<QuestionMultipleTextProps> {
    renderItem: (question: any, idx: any) => JSX.Element;
    render(): JSX.Element;
}
declare const _default: typeof QuestionMultipleText;
export default _default;

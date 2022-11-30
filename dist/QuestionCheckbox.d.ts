import React from 'react';
export interface Props {
    choices: Array<any>;
    hasOther?: boolean;
    value: Array<string>;
    comment?: string;
    otherText?: string;
    onChange(value: any, comment?: any): any;
}
export default class QuestionCheckbox extends React.Component<Props> {
    handleChoicesChange: (checked: any, value: any) => void;
    handleCommentChange: (comment: any) => void;
    render(): JSX.Element;
}

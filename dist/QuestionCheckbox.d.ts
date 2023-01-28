import React from 'react';
export interface QuestionCheckboxProps {
    choices: Array<any>;
    comment?: string;
    hasOther?: boolean;
    onChange(value: any, comment?: any): any;
    otherText?: string;
    value: Array<string>;
}
export default class QuestionCheckbox extends React.Component<QuestionCheckboxProps> {
    handleChoicesChange: (checked: any, value: any) => void;
    handleCommentChange: (comment: any) => void;
    render(): JSX.Element;
}

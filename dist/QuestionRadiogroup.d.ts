/// <reference types="react" />
import React from 'react';
export interface Props {
    choices: any;
    hasOther?: boolean;
    onChange(value: any, comment?: any): any;
    value: string;
    comment?: string;
    otherText?: string;
}
export default class QuestionRadiogroup extends React.Component<Props, any> {
    handleChoicesChange: (value: any) => void;
    handleTextInputChange: (comment: any) => void;
    render(): JSX.Element;
}

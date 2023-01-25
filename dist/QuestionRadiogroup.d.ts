import React from 'react';
export interface Props {
    choices: Array<any>;
    hasOther?: boolean;
    onChange(value: any, comment?: any): any;
    value: string;
    comment?: string;
    otherText?: string;
}
export default class QuestionRadiogroup extends React.Component<Props> {
    handleChoicesChange: (value: any) => void;
    handleTextInputChange: (comment: any) => void;
    render(): JSX.Element;
}

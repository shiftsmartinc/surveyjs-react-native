import React from 'react';
export interface QuestionRadiogroupProps {
    choices: Array<any>;
    comment?: string;
    hasOther?: boolean;
    onChange(value: any, comment?: any): any;
    otherText?: string;
    value: string;
}
export default class QuestionRadiogroup extends React.Component<QuestionRadiogroupProps> {
    handleChoicesChange: (value: any) => void;
    handleTextInputChange: (comment: any) => void;
    render(): JSX.Element;
}

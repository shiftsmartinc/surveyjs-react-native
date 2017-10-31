/// <reference types="react" />
import React from 'react';
export interface Props {
    choices: any;
    hasOther?: boolean;
    optionsCaption?: string;
    value: string;
    comment?: string;
    otherText?: string;
    onChange(value: any, comment?: any): any;
}
export default class QuestionActionsheet extends React.Component<Props, any> {
    ActionSheet: any;
    constructor(props: any);
    componentWillMount(): void;
    handleCommentChange: (comment: any) => void;
    onSelect: (index: any) => void;
    render(): JSX.Element;
}

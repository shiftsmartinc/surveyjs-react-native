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
export default class QuestionDropdown extends React.Component<Props, any> {
    constructor(props: Props);
    handleCommentChange: (comment: string) => Function;
    openModal: () => void;
    closeModal: () => void;
    render(): JSX.Element;
}

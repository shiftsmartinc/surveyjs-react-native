import React from 'react';
export interface QuestionDropdownProps {
    choices: any;
    comment?: string;
    hasOther?: boolean;
    onChange(value: any, comment?: any): any;
    optionsCaption?: string;
    otherText?: string;
    value: string;
}
export default class QuestionDropdown extends React.Component<QuestionDropdownProps, any> {
    constructor(props: QuestionDropdownProps);
    handleCommentChange: (comment: any) => void;
    openModal: () => void;
    closeModal: () => void;
    render(): JSX.Element;
}

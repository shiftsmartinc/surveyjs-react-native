/// <reference types="react" />
import React from 'react';
export interface Props {
    placeholder?: string;
    inputType: string;
    value?: any;
    onChange(value: any): any;
}
export default class QuestionTextDatetime extends React.Component<Props> {
    private mode;
    constructor(props: any);
    showPicker: () => void;
    hidePicker: () => void;
    handleConfirm: (date: any) => void;
    getFormatedValue: (value: any) => string;
    render(): JSX.Element;
}

import React from 'react';
export interface QuestionBooleanProps {
    label?: string;
    name: string;
    onChange(value: any, comment?: any): any;
    value?: boolean;
}
export interface QuestionBooleanState {
    dirty: boolean;
}
export default class QuestionBoolean extends React.Component<QuestionBooleanProps, QuestionBooleanState> {
    constructor(props: any);
    handleChecked: (checked: any) => void;
    render(): JSX.Element;
}

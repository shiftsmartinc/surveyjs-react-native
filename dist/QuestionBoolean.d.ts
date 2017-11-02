/// <reference types="react" />
import React from 'react';
export interface Props {
    label?: string;
    name: string;
    value?: boolean;
    onChange(value: any, comment?: any): any;
}
export default class QuestionBoolean extends React.Component<Props> {
    constructor(props: any);
    handleChecked: (checked: any) => void;
    render(): JSX.Element;
}

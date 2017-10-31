/// <reference types="react" />
import React from 'react';
import { KeyboardType } from 'react-native';
export interface Props {
    placeholder?: string;
    inputType?: string;
    multiline?: boolean;
    rows?: number;
    value: string;
    onChange(value: any): any;
}
export default class QuestionText extends React.Component<Props, any> {
    getKeyboardType: () => KeyboardType;
    render(): JSX.Element;
}

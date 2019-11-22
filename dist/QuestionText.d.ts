import React from 'react';
export interface Props {
    isPreview?: boolean;
    placeholder?: string;
    inputType?: string;
    rows?: number;
    value: string;
    onChange(value: any): any;
}
export default class QuestionText extends React.Component<Props> {
    getKeyboardType: () => "default" | "email-address" | "numeric";
    render(): JSX.Element;
}

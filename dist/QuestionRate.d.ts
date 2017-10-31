/// <reference types="react" />
import React from 'react';
export interface Props {
    rateValues: Array<any>;
    minRateDescription?: string;
    maxRateDescription?: string;
    value?: any;
    onChange(value: any, comment?: any): any;
}
export default class QuestionRate extends React.Component<Props, any> {
    onItemChecked: (value: any) => void;
    render(): JSX.Element;
}

import React from 'react';
export interface Props {
    rateValues: Array<any>;
    minRateDescription?: string;
    maxRateDescription?: string;
    value?: any;
    onChange(value: any, comment?: any): any;
}
export default class QuestionRate extends React.Component<Props> {
    onItemChecked: (value: any) => void;
    render(): JSX.Element;
}

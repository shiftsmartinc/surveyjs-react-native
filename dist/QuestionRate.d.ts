import React from 'react';
export interface QuestionRateProps {
    maxRateDescription?: string;
    minRateDescription?: string;
    onChange(value: any, comment?: any): any;
    rateValues: Array<any>;
    value?: any;
}
export default class QuestionRate extends React.Component<QuestionRateProps> {
    onItemChecked: (value: any) => void;
    render(): JSX.Element;
}

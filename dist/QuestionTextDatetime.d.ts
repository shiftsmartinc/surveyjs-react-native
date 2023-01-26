import React from 'react';
export interface QuestionTextDatetimeProps {
    placeholder?: string;
    inputType: string;
    value?: any;
    onChange(value: any): any;
}
export interface QuestionTextDatetimeState {
    isDateTimePickerVisible: boolean;
    value: any;
}
export default class QuestionTextDatetime extends React.Component<QuestionTextDatetimeProps, QuestionTextDatetimeState> {
    state: {
        isDateTimePickerVisible: boolean;
        value: any;
    };
    openPicker: () => void;
    closePicker: () => void;
    onConfirm: (date: any) => void;
    getPlaceholder(): "Select Date" | "Select Time" | "Select Date & Time";
    getFormatedValue(value: any): string;
    render(): JSX.Element;
}

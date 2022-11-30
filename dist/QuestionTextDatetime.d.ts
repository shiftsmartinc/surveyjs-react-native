import React from 'react';
export interface Props {
    placeholder?: string;
    inputType: string;
    value?: any;
    onChange(value: any): any;
}
export default class QuestionTextDatetime extends React.Component<Props> {
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

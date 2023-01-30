import React from 'react';
export interface DatetimePickerProps {
    isVisible?: boolean;
    mode?: 'date' | 'time' | 'datetime';
    onConfirm(date: Date): void;
    onCancel(date: Date): void;
}
export default class DatetimePicker extends React.PureComponent<DatetimePickerProps> {
    state: {
        date: Date;
    };
    getTitle(): "Select Date" | "Select Time" | "Select Date & Time";
    render(): JSX.Element;
}

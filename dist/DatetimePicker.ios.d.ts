import React from 'react';
export interface Props {
    isVisible?: boolean;
    mode?: 'date' | 'time' | 'datetime';
    onConfirm(date: Date): void;
    onCancel(date: Date): void;
}
export default class DatetimePicker extends React.PureComponent<Props> {
    state: {
        date: Date;
    };
    getTitle(): "Select Date" | "Select Time" | "Select Date & Time";
    render(): any;
}

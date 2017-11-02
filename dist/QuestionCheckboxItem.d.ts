/// <reference types="react" />
import React from 'react';
export interface Props {
    text?: string;
    value: string;
    defaultChecked?: boolean;
    pristine?: boolean;
    checked: boolean;
    onChange?: (boolean, string) => void;
}
export default class CheckBoxItem extends React.Component<Props> {
    handlePress: () => void;
    render(): JSX.Element;
}

import React from 'react';
export interface Props {
    isPreview?: boolean;
    text?: string;
    label?: string;
    value: string;
    defaultChecked?: boolean;
    pristine?: boolean;
    checked: boolean;
    onChange?: (boolean: any, string: any) => void;
}
export default class CheckBoxItem extends React.Component<Props> {
    handlePress: () => void;
    render(): JSX.Element;
}

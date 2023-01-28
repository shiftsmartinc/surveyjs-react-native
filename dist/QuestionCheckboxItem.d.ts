import React from 'react';
export interface CheckBoxItemProps {
    checked: boolean;
    defaultChecked?: boolean;
    isPreview?: boolean;
    label?: string;
    onChange?: (boolean: any, string: any) => void;
    pristine?: boolean;
    text?: string;
    value: string;
}
declare class CheckBoxItem extends React.Component<CheckBoxItemProps> {
    handlePress: () => void;
    render(): JSX.Element;
}
declare const _default: typeof CheckBoxItem & import("mobx-react").IWrappedComponent<{}>;
export default _default;

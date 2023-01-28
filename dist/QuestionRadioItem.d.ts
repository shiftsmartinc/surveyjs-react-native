import React from 'react';
export interface QuestionRadioItemProps {
    checked: boolean;
    defaultChecked?: boolean;
    isPreview?: boolean;
    label?: string;
    onChange?: (string: any) => void;
    text?: string;
    value: string;
}
declare class QuestionRadioItem extends React.Component<QuestionRadioItemProps> {
    handlePress: () => void;
    render(): JSX.Element;
}
declare const _default: typeof QuestionRadioItem & import("mobx-react").IWrappedComponent<{}>;
export default _default;

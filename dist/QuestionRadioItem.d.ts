import React from 'react';
export interface Props {
    text?: string;
    label?: string;
    value: string;
    defaultChecked?: boolean;
    checked: boolean;
    onChange?: (string: any) => void;
}
export default class QuestionRadioItem extends React.Component<Props> {
    handlePress: () => void;
    render(): JSX.Element;
}
